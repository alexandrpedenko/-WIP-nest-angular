import { HttpParams } from "@angular/common/http";

export function serializeHttpParams(params: object): HttpParams | undefined {
  if (!params) return;
  let httpParams = new HttpParams();

  Object.entries(params).forEach(([key, value]) => {
    if(key && value) {
      httpParams = httpParams.append(key, value);
    }
  });
  return httpParams;
}
