import { useQuery, useMutation } from "react-query";
import { API, Method } from "@util/query";
import { UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";
import { method } from "lodash";
import users from "pages/admin/users";

export const useCreateLoad = () =>
  useMutation(API._mutate(Method.POST, "users/index"));
// Give new access to local doctor
export const useAssignToLocalDoctor = () =>
  useMutation(API._mutate(Method.POST, `patient/giveaccess`));

// Give new access to local doctor
export const useRemoveFromAccessTable = () =>
  useMutation(API._mutate(Method.POST, `patient/removeaccess`));

// Give new access to local doctor
export const usePhonechangemanually = () =>
  useMutation(API._mutate(Method.POST, `users/phonechangemanually`));
export const useChangePasswordManually = () =>
  useMutation(API._mutate(Method.POST, `users/changepassword`));
export const useChangeEmailManually = () =>
  useMutation(API._mutate(Method.POST, `users/changeemail`));
