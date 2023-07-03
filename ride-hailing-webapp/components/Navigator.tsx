import React from "react";
import Link from "next/link";
import styled from "styled-components";

interface HomeNavigationProps {
  text: string;
  backgroundColor: string;
  url: string;
}

const StyledContainer = styled.div`
  height: 50px;
  padding: 0.25rem 0rem 0.25rem 2rem;
  display: flex;
  align-items: center;
`;

const StyledText = styled.span`
  font-weight: bold;
  font-size: large;
  color: #ffffff;
`;

const Navigator: React.FC<HomeNavigationProps> = ({
  text,
  backgroundColor,
  url,
}) => {
  return (
    <StyledContainer style={{ backgroundColor }}>
      <Link
        href={url}
        style={{
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "large",
          color: "#ffffff",
        }}
      >
        {text}
      </Link>
    </StyledContainer>
  );
};

export default Navigator;
