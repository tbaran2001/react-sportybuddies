import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../contexts/ApiProvider";
import Spinner from "react-bootstrap/Spinner";
import Body from "../components/Body";
import User from "../components/User";
import { useUser } from "../contexts/UserProvider";

export default function MatchingPage() {
  const { user } = useUser();
  const api = useApi();

  

  return (
    <Body sidebar>
      Matching
    </Body>
  );
}
