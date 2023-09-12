FROM golang:1.20

WORKDIR /app

COPY . .

RUN go build -o app main.go

EXPOSE 3080

CMD ["./app"]


