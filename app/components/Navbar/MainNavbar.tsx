"use client"

import Image from "next/image"
import ContainerCard from "../Card/ContainerCard"
import { redirect } from "next/navigation"
import SecondaryButton from "../Button/SecondaryButton"
import { useRef, useState } from "react"
import Text from "../Text/Text"
import { signOut, useSession } from "next-auth/react"
import GenericTooltip from "../Tooltip/GenericTooltip"
import { useIsTruncated } from "@/utils/hooks"
import { Menu } from "@mantine/core"

export default function MainNavbar() {
  const textRef = useRef(null)
  const isTruncated = useIsTruncated(textRef)
  const { data: session } = useSession()

  const [isActive, setIsActive] = useState<string>("workshop")
  const [opened, setOpened] = useState(false)

  console.log(session)

  return (
    <div className="flex xl:gap-8 items-center justify-between py-8 bg-none xl:h-48">
      <ContainerCard
        onClick={() => redirect("/dashboard")}
        styles="hover:cursor-pointer hover:bg-digigold"
      >
        <div className="flex flex-none h-14 w-[8.125rem] items-start relative ">
          <Image
            src={"/icons/logo-navbar.svg"}
            alt={"Logo Image"}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </ContainerCard>
      <ContainerCard>
        <div className="flex h-14 items-start gap-4 justify-between relative w-full">
          <SecondaryButton
            id="overview"
            text="Visão Geral"
            onClick={() => setIsActive("overview")}
            active={isActive === "overview"}
            withImage
            imageSrc={
              isActive === "overview"
                ? "/icons/bubble_chart_white.svg"
                : "/icons/bubble_chart.svg"
            }
            disabled={true}
          />
          <SecondaryButton
            id="sales"
            text="Vendas"
            onClick={() => setIsActive("sales")}
            active={isActive === "sales"}
            withImage
            imageSrc={
              isActive === "sales"
                ? "/icons/bar_chart_white.svg"
                : "/icons/bar_chart.svg"
            }
            disabled={true}
          />
          <SecondaryButton
            id="vehicles"
            text="Veículos"
            onClick={() => setIsActive("vehicles")}
            active={isActive === "vehicles"}
            withImage
            imageSrc={
              isActive === "vehicles"
                ? "/icons/local_car_wash_white.svg"
                : "/icons/local_car_wash.svg"
            }
            disabled={true}
          />
          <SecondaryButton
            id="clients"
            text="Clientes"
            onClick={() => setIsActive("clients")}
            active={isActive === "clients"}
            withImage
            imageSrc={
              isActive === "clients"
                ? "/icons/supervised_user_circle_white.svg"
                : "/icons/supervised_user_circle.svg"
            }
            disabled={true}
          />
          <SecondaryButton
            id="analytics"
            text="Analytics"
            onClick={() => setIsActive("analytics")}
            active={isActive === "analytics"}
            withImage
            imageSrc={
              isActive === "analytics"
                ? "/icons/insights_white.svg"
                : "/icons/insights.svg"
            }
            disabled={true}
          />
          <SecondaryButton
            id="workshop"
            text="Oficina"
            onClick={() => setIsActive("workshop")}
            active={isActive === "workshop"}
            withImage
            imageSrc={
              isActive === "workshop"
                ? "/icons/workshop_white.svg"
                : "/icons/workshop.svg"
            }
          />
        </div>
      </ContainerCard>
      <Menu shadow="md" width={200} position="bottom-end" opened={opened}>
        <ContainerCard styles="max-w-[15rem]">
          <Menu.Target>
            <div className="flex h-14 items-center gap-3 justify-between relative w-full">
              <div className="flex flex-none h-10 w-10 rounded-full relative ">
                <Image
                  src={"/icons/user-default.svg"}
                  alt={"Imagem de perfil do utilizador"}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="flex flex-col gap-0.5 flex-1 items-start">
                <Text
                  text={session?.user?.username ?? ""}
                  styles="text-digiblack1624-semibold line-clamp-1"
                  id={"username"}
                  ref={textRef}
                />
                <GenericTooltip
                  anchorSelect="username"
                  text={session?.user?.username ?? ""}
                  hidden={!isTruncated}
                  withArrow={false}
                />
                <Text
                  text={session?.user?.role ?? ""}
                  styles="text-digiblack1420-normal"
                />
              </div>

              <div
                className="flex flex-none h-6 w-6 rounded-full relative"
                onClick={() => setOpened(!opened)}
              >
                <Image
                  src={opened ? "/icons/arrow_up.svg" : "/icons/arrow_down.svg"}
                  alt={"Arrow de dropdown"}
                  layout="fill"
                  objectFit="contain"
                  className="hover:cursor-pointer hover:bg-digigold hover:rounded-full"
                />
              </div>
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item disabled>Perfil</Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={() => signOut()}>Terminar sessão</Menu.Item>
          </Menu.Dropdown>
        </ContainerCard>
      </Menu>
    </div>
  )
}
