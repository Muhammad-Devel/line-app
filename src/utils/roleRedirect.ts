// utils/roleRedirect.ts
export const roleRedirect = (role: string) => {
  switch (role) {
    case "admin":
      return "/";
    case "business":
      return "/onboarding";
    case "client":
      return "/c";
    default:
      return "/login";
  }
};
