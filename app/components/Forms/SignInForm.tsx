import { UserCredentials } from "@/app/types/user"
import Text from "../Text"
import PrimaryInput from "../Inputs/PrimaryInput"
import { useForm } from "react-hook-form"
import PrimaryButton from "../Buttons/PrimaryButton"
import Image from "next/image"

type SignInFormProps = {
  onSubmit: (data: UserCredentials) => void
  error?: string | null
}

const SignInForm = (props: SignInFormProps) => {
  const { onSubmit, error } = props

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<UserCredentials>({
    defaultValues: {
      username: "",
      password: ""
    }
  })

  // Watch values dynamically
  const username = watch("username")
  const password = watch("password")

  return (
    <div className="relative flex flex-col items-center justify-center xl:gap-6 gap-4 border border-digibrown rounded-2xl px-6 py-16 bg-gray-50 w-full">
      <Image
        src={"/icons/logo.svg"}
        alt="Logo Image"
        width={600}
        height={200}
      />
      <Text
        text="Por favor, preencha todos os dados para aceder à plataforma"
        styles="text-digiblack2025-semibold text-center"
      />
      <form
        className="flex flex-col gap-10 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-1 items-start w-full">
            <Text text="Username" styles="text-digiblack1624-semibold" />
            <PrimaryInput
              query={username}
              setQuery={(e) => setValue("username", e)}
              error={errors.username?.message || error}
              placeholder="Username"
              inputType="text"
              mandatory
            />
          </div>
          <div className="flex flex-col gap-1 items-start w-full">
            <Text text="Password" styles="text-digiblack1624-semibold" />
            <PrimaryInput
              query={password}
              setQuery={(e) => setValue("password", e)}
              error={errors.password?.message || error}
              placeholder="Password"
              inputType="password"
              mandatory
            />
          </div>
        </div>
        <PrimaryButton text="Login" size="large" type="submit" fullWidth />
      </form>
    </div>
  )
}

export default SignInForm
