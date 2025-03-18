import { Body, Head, Html } from "@react-email/components";
import * as React from "react";

export const MyEmail = () => {
  return (
    <Html>
      <Head />
      <Body>
        <p>Hello</p>
      </Body>
    </Html>
  );
};

export default MyEmail;
