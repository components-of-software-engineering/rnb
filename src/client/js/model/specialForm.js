// @ts-check
import url from "url";
import Response from "./response";
import { authorizationHeaders, formDataToJson } from "../utils/service";

class SpecialForm {
  static async create(jwt, formData) {
    let response, respBody, statusCode;
    let error = null;
    const reqOptions = authorizationHeaders(jwt);
    reqOptions.method = "POST";
    reqOptions.headers["Content-Type"] = "application/json";
    formData.set("series", formData.get("series").toUpperCase());
    reqOptions.body = formDataToJson(formData);
    try {
      response = await fetch("/blank/create", reqOptions);
      statusCode = response.status;
      if (!response.ok || response.status !== 201)
        throw new Error(`Такий бланк вже зареєстровано`);

      response = await fetch("/usages_register/create", reqOptions);
      statusCode = response.status;
      if (!response.ok || response.status !== 201)
        throw new Error(`Такий бланк вже зареєстровано`);
    } catch (e) {
      error = e;
    }
    return new Response(statusCode, respBody, error);
  }

  static async getMinimalInfo(jwt, number) {
    let response, respBody, statusCode;
    let error = null;
    try {
      response = await fetch(`/api/v1/invoices/${number}`);
      statusCode = response.status;
      if (!response.ok) throw new Error(response.statusText);
      respBody = await response.json();
    } catch (e) {
      error = e;
    }
    respBody = {
      statusCode: 4,
      statusPhrase: "Заповіт",
      dateUsing: new Date(),
    };
    //statusCode = 404;
    return new Response(statusCode, respBody, error);
  }
}

export default SpecialForm;
