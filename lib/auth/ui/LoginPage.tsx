import { UserRole } from "@prisma/client";
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  PinInput,
  PinInputField,
  Text,
  toaster,
} from "@ui/index";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { MdPerson } from "react-icons/md";
import { AuthLayout } from ".";
import { usePhoneConfirmation, usePhoneVerification } from "../data/authHooks";
import { CardCaption } from "./components";

type AdminLoginInput = {
  email: string;
  pin: string;
  showPin: boolean;
  code: string;
};
export const LoginPage = () => {
  const router = useRouter();

  const requestCodeMutation = usePhoneVerification();
  const mutation = usePhoneConfirmation();

  const {
    control,
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<AdminLoginInput>({
    defaultValues: {
      pin: "123456",
    },
  });
  const action = handleSubmit(async (data) => {});
  const onPinChange = (value: string) => {
    clearErrors("pin");
    setValue("pin", value);
  };
  watch("showPin");
  const doLogin = () => {
    const body = {
      username: getValues("email").toLowerCase(),
      method: "email",
      code: getValues("code"),
    };

    if (getValues("showPin") !== true) {
      requestCodeMutation.mutate(body, {
        onError: (error: any) => {
          setError("email", { message: error.translationKey });
        },
        onSuccess: (data: any) => {
          if (data.success == true) {
            setValue("showPin", true);
            toaster.success(
              "Please enter the verification code sent to your phone"
            );
          }
        },
      });
      return;
    }

    if (!getValues("pin") || getValues("pin").length != 6)
      return setError("pin", {
        message: "Please enter a valid code",
      });

    mutation.mutate(
      { ...body, pin: getValues("pin") },
      {
        onError: (error: any) => {
          toaster.success("The verification code is incorrect.");
          setError("pin", { message: error.translationKey });
        },
        onSuccess: (data: any) => {
          toaster.success("Verification successful.");
          if (data.role == UserRole.ADMIN)
            router.push({
              pathname: `/admin`,
              query: "",
            });
        },
      }
    );
  };
  return (
    <AuthLayout title={"Login"} caption={""} contentWidth="480px">
      <chakra.form onSubmit={action}>
        <Flex flex="1" gap="3" flexDir="column" borderLeftRadius={"10px"}>
          <FormControl id="email" isInvalid={!!errors.email}>
            <CardCaption text={"Phone Number"} />
            <InputGroup>
              <Input
                w="full"
                fontSize="sm"
                border="1px"
                borderRadius="3px"
                color={"gray.900"}
                borderColor={"green.400"}
                _focus={{
                  color: "green.900",
                  borderColor: "green.500",
                  bg: "white",
                }}
                disabled={getValues("showPin") === true}
                type="text"
                placeholder={"Enter your phone number"}
                {...register("email", {
                  required: "Please enter your phone number",
                })}
              />
            </InputGroup>
          </FormControl>
          {getValues("showPin") && (
            <FormControl id="pin" pt={4} isInvalid={!!errors.pin}>
              <CardCaption
                text={`Please enter the pin code sent to your phone`}
              />
              <HStack justify="space-between">
                <PinInput
                  size={"md"}
                  isInvalid={!!errors.pin}
                  onChange={onPinChange}
                  value={getValues("pin")}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <FormErrorMessage>
                {errors.pin && errors.pin.message}
              </FormErrorMessage>
              <Box pt={4}>
                <Text
                  onClick={() => {
                    setValue("showPin", false);
                  }}
                  textAlign={"center"}
                  color="gray.600"
                  fontSize={"14px"}
                >
                  Log in with a different email
                </Text>
              </Box>
            </FormControl>
          )}
          <Button
            w="full"
            variant="onboarding"
            isLoading={requestCodeMutation.isLoading || mutation.isLoading}
            onClick={doLogin}
          >
            Continue
          </Button>
        </Flex>
      </chakra.form>
    </AuthLayout>
  );
};
