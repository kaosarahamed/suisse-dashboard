import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";
import ChatBox from "../ChatBox";

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3 }) => {
  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);
  const adminAuth = localStorage.getItem("admin");
  const admin = JSON.parse(adminAuth);

  return (
    <Fragment>
      <NavHader admin={admin} />
      <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
      <Header
        onNote={() => onClick("chatbox")}
        onNotification={() => onClick("notification")}
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        onBox={() => onClick("box")}
        onClick={() => ClickToAddEvent()}
        admin={admin}
      />
      <SideBar admin={admin} />
    </Fragment>
  );
};

export default JobieNav;
