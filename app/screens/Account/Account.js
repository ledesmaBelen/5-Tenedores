import React, { useState, useEffect } from "react";
import UserLogged from "./UserLogged";
import Login from "../Account/Login";
import Loading from "../../components/Loading";
import { loginCheck } from "../../controllers/UserController";

export default function Account() {
  const [login, setLogin] = useState(null);
  //SI DEJAMOS EL USE EFFECT CON []
  //SE ACTUALIZARA LAS VECES QUE HAYAN VCAMBIOS SINO SOLO SE EJECUTA CUANDO CARGA EL COMPONENTE
  //SE VERIFICA SI EL USUARIO ESTA LOGEADO Y RETORNA USERLOGGER, SINO RETORNA USERGUEST
  useEffect(() => {
    loginCheck(setLogin);
  }, []);

  //SI ES NULL MUESTRA EL COMPONENTE LOADING CARGANDO
  if (login === null) return <Loading isVisible={true} text="Cargando..." />;
  //SI EL USIARIO ESTA LOGGEADO RETORNA USERLOGGER
  //SI NO ESTA LOG SOLO PUEDE EL CONTENIDO DE USERGUEST
  return login ? <UserLogged /> : <Login />;
}
