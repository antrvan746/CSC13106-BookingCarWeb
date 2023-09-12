interface SocketListener {
  onOpen: (() => void),
  onMessage: ((e: MessageEvent<any>) => void),
  onError: ((e: Event) => void),
  onClose: ((e: Event) => void)
}

interface DriverInfo {
  driver_id: string
}

export interface RindeRequestInfo {
  "slon": number,
  "slat": number,
  "sadr": string,

  "elon": number,
  "elat": number,
  "eadr": string,

  "user_id": string,
  "user_name": string,
  "user_phone": string
}

interface RideWsConstrucProps {
  onOpen?: SocketListener["onOpen"]
  onMessage?: SocketListener["onMessage"]
  onError?: SocketListener["onError"]
  onClose?: SocketListener["onClose"],
  onDriverFound?: (info: DriverInfo | null) => void,

}

class RideWs {
  private ws: WebSocket | undefined
  readonly StatusMsg = {
    DriverFound: "DRF߷",
    NoDriver: "NDR߷",
    DriverCancel: "DCX߷",
    ClientCancel: "CCX߷",
    TripId: "TID߷",
    Message: "MSG߷",
  }
  public client_listeners: RideWsConstrucProps

  constructor(listeners: RideWsConstrucProps) {
    this.client_listeners = listeners;

    this._onWsOpen = this._onWsOpen.bind(this);
    this._onWsError = this._onWsError.bind(this);
    this._onWsClose = this._onWsClose.bind(this);
    this._onWsMessage = this._onWsMessage.bind(this);
  }

  public Connect(info: RindeRequestInfo) {
    if (this.ws) {
      console.log("Already socket ");
      return
    }

    const queries = Object.entries(info).map(([k, v]) => `${k}=${v}`).join("&");

    console.log("Creating websocket")
    this.ws = new WebSocket(`ws://localhost:3080/ridehail/trip/admin/client/w3gv7?${queries}`);
    this.ws.binaryType = "arraybuffer"
    //this.ws = new WebSocket(url,"ws");
    this.ws.onopen = this._onWsOpen;
    this.ws.onmessage = this._onWsMessage;
    this.ws.onerror = this._onWsError;
    this.ws.onclose = this._onWsClose;
  }

  private _onWsOpen() {
    console.log(this.client_listeners);
    console.log("Web socket open");
    this.client_listeners?.onOpen?.()
  }

  private _onWsMessage(e: MessageEvent<any>) {
    if (!e.data || typeof e.data !== "string") {
      return
    }
    const msg = e.data as string
    console.log("Web socket message: ", e.data);
    const cmd = msg.length <= 4 ? msg : msg.substring(0, 4)
    switch (cmd) {
      case this.StatusMsg.NoDriver:
        this.Close();
        this.client_listeners?.onDriverFound?.(null);
        break;
      // case this.StatusMsg.ClientCancel:
      //   this.Close();
      //   break
      // case this.StatusMsg.DriverCancel:
      //   this.Close();
      //   break
      case this.StatusMsg.Message:
        console.log("Driver msg: ", e.data);
        break;
      case this.StatusMsg.DriverFound:
        try {
          const driver = JSON.parse(msg.substring(4))
          this.client_listeners?.onDriverFound?.(driver);
        } catch (e) {
          console.log(e)
        }
        break
      default:
        console.log("Unknow ws cmd:", cmd, msg)
    }

  }

  private _onWsError(e: Event) {
    console.log("Web socket error: ", e);
    this.client_listeners?.onError?.(e)
  }

  private _onWsClose(e: any) {
    if (e.reason) {
      this._onWsMessage({
        data: e.reason
      } as any)
    }
    //console.log(`Web socket closed. Code: ${e.code}. Reason: ${e.reason}`);
    console.log("Web socket closed", e)
    this.client_listeners.onClose?.(e)
    this.Close();
  }

  public Close() {
    try {
      this.ws?.close();
    } catch (e) {
      console.log("Web socket closing error: ", e);
    }
    this.ws = undefined;
  }

  public Send(data: string | ArrayBuffer | ArrayBufferView | Blob) {
    try { this.ws?.send(data) } catch (e) {
      console.log("Web socket send error: ", e);
    }
  }

}
const globalRideWS = globalThis as unknown as {
  RideWS: RideWs | undefined
}
export const rideWs = globalRideWS.RideWS ?? new RideWs({})
globalRideWS.RideWS = rideWs 
// export default RideWs;