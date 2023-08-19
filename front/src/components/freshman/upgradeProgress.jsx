import { authorizedRequest } from "../account/AxiosInterceptor";

async function upgradeProgress(status) {
  try {
    const response = await authorizedRequest({
      method: "post",
      url: "/api/members/status/progress",
      data: { tutorialProgress: status },
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export default upgradeProgress;
