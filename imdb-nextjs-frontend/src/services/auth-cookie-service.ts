import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { store } from "../store";
import { login } from "../store/slices/auth-slice";
import { DateUtil } from "../utils/date-util";
import { JwtPayload } from "../components/AuthHeader";

export class AuthCookieService {
  public static createAccessTokenCookie(
    accessToken: string,
    expiresInDays: number
  ) {
    setCookie("ACCESS_TOKEN", JSON.stringify({ accessToken, expiresInDays }), {
      expires: DateUtil.addDaysToCurrentDate(expiresInDays),
    });
  }

  public static deleteAccessTokenCookie() {
    deleteCookie("ACCESS_TOKEN");
  }

  public static verifyAuthCookie() {
    const accessTokenCookie = this.retrieveAccessTokenCookie();

    if (accessTokenCookie) {
      const { accessToken, expiresInDays } = JSON.parse(accessTokenCookie);
      const { email, role, sub } = jwtDecode<JwtPayload>(accessToken);

      store.dispatch(
        login({
          accessToken: accessToken,
          email,
          expiringDate:
            DateUtil.addDaysToCurrentDate(expiresInDays).toISOString(),
          role,
          id: sub,
        })
      );
    }
  }

  private static retrieveAccessTokenCookie() {
    return getCookie("ACCESS_TOKEN");
  }
}
