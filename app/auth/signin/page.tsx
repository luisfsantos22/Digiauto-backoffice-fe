"use client" // Ensure the file is marked as a client component

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import SignInForm from "@/app/components/Forms/SignInForm"
import { UserCredentials } from "@/app/types/user"
import Text from "@/app/components/Text"
import { Carousel } from "@mantine/carousel"
import { createTheme, MantineProvider } from "@mantine/core"
import classes from "@/app/css/mantine.module.css"
import Autoplay from "embla-carousel-autoplay"
import { CAROUSEL_TEXT_LIST } from "@/app/constants"
import { set } from "react-hook-form"
const SignInPage = () => {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)

  const autoplay = useRef(Autoplay({ delay: 5000 }))

  const handleSubmit = async (data: UserCredentials) => {
    setError("")
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username: data.username,
        password: data.password
      })

      if (response.status === 200) {
        router.push("/")
      }
    } catch (err: any) {
      setError("Credenciais inválidas")
    }
  }

  return (
    <div className="flex items-center justify-center md:h-screen bg-digigold">
      <div className="flex xl:grid xl:grid-cols-2 w-full">
        {/* Form to sign in */}
        <div className="col-span-1 flex items-center justify-center max-w-[37.5rem] mx-auto p-4 relative w-full">
          <SignInForm onSubmit={handleSubmit} error={error} />
        </div>
        <div
          className="relative col-span-1 bg-cover bg-center h-screen  items-center justify-center mx-auto w-full xl:flex hidden"
          style={{ backgroundImage: "var(--color-bg-signin)" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="flex flex-col gap-20 px-10 z-10">
            <Text
              text="Guiamos o Seu Stand para a Excelência Digital"
              styles="text-digiwhite4040-bold"
            />
            <div className="flex justify-center w-lg items-center self-center">
              <MantineProvider>
                <Carousel
                  withIndicators
                  height={400}
                  slideGap={"xl"}
                  classNames={classes}
                  plugins={[autoplay.current]}
                  onMouseEnter={autoplay.current.stop}
                  onMouseLeave={autoplay.current.reset}
                >
                  {CAROUSEL_TEXT_LIST.map((text, index) => (
                    <Carousel.Slide key={index}>
                      <Text
                        text={text}
                        styles="text-digiwhite2025-normal text-center !leading-8"
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </MantineProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
