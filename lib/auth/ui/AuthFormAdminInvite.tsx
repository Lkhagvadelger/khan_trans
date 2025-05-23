import { faker } from "@faker-js/faker";
import { UserRole } from "@prisma/client";
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  toaster,
  useColorModeValue,
  VStack,
} from "@ui/index";
import { Select as ReactSelect } from "chakra-react-select";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";

type selectInput = {
  value: any;
  label: string;
};

export type InviteInput = {
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: UserRole;
};

export const AuthFormAdminInvite = ({
  onComplete,
  role,
}: {
  onComplete: () => void;
  role?: UserRole;
}) => {
  const { t: ta } = useTranslation("auth");
  const { t: to } = useTranslation("common");
  const { t: te } = useTranslation("error");

  const defaultValues = {
    code: "",
    firstName: "",
    lastName: "",
    email: "",
    role: role || UserRole.DRIVER,
  };
  if (process.env.NODE_ENV !== "production") {
    defaultValues.code = faker.word.noun(8);
    defaultValues.firstName = faker.name.firstName();
    defaultValues.lastName = faker.name.lastName();
    defaultValues.email = faker.internet.email();
  }

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InviteInput>({
    defaultValues: defaultValues,
  });

  const onPhoneSubmit: SubmitHandler<InviteInput> = (authInput) => {};

  const roleList: selectInput[] = Object.keys(UserRole).map((r, ii) => ({
    label: ta("role." + r),
    value: r,
  }));

  const [selectedRole, setSelectedRole] = useState(
    roleList.filter((r) => r.value == getValues("role"))[0]
  );

  const [selectedSex, setSelectedSex] = useState({
    label: "",
    value: "",
  });
  return (
    <chakra.form onSubmit={handleSubmit(onPhoneSubmit)}>
      <HStack spacing={4}>
        <FormControl id="role" isInvalid={!!errors.role}>
          <FormLabel>Хандах эрх</FormLabel>
          <ReactSelect
            placeholder={"Select Role"}
            size={"md"}
            value={selectedRole}
            options={roleList}
            onChange={(bambar: any) => {
              setSelectedRole(bambar);
            }}
          />
          <FormErrorMessage>
            {errors.role && errors.role.message}
          </FormErrorMessage>
        </FormControl>
      </HStack>
      <VStack spacing={4} mt={5}>
        <FormControl id="lastName" isInvalid={!!errors.lastName}>
          <FormLabel>Овог</FormLabel>
          <Input
            type="text"
            {...register("lastName", {
              required: te("validation.last-name.required"),
            })}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="firstName" isInvalid={!!errors.firstName}>
          <FormLabel>Нэр</FormLabel>
          <Input
            type="text"
            {...register("firstName", {
              required: te("validation.first-name.required"),
            })}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel>Email Address</FormLabel>
          <HStack
            position={"relative"}
            border={"1px"}
            borderRadius={"3px"}
            borderColor={"gray.200"}
            backgroundColor={useColorModeValue("gray.100", "gray.850")}
            h={10}
          >
            <Box ml={2}>
              <MdEmail />
            </Box>
            <Input
              fontSize={12}
              border={"none"}
              variant={"unstyled"}
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder={"example@email.com"}
            />
          </HStack>
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <Box w="full">
          <Button type="submit" size="md" variant="add">
            Save
          </Button>
        </Box>
      </VStack>
    </chakra.form>
  );
};
