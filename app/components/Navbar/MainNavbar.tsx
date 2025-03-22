"use client"

import Image from "next/image"
import ContainerCard from "../Card/ContainerCard"
import { redirect } from "next/navigation"
import SecondaryButton from "../Buttons/SecondaryButton"
import { useState } from "react"

export default function MainNavbar() {
  const [isActive, setIsActive] = useState<string>("")
  return (
    <div className="flex xl:gap-10 items-center justify-between p-8 bg-none xl:h-48">
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
            imageSrc={"/icons/bubble_chart.svg"}
          />
          <SecondaryButton
            id="sales"
            text="Gestão de Vendas"
            onClick={() => setIsActive("sales")}
            active={isActive === "sales"}
            withImage
            imageSrc={"/icons/bar_chart.svg"}
          />
          <SecondaryButton
            id="vehicles"
            text="Inventário de Veículos"
            onClick={() => setIsActive("vehicles")}
            active={isActive === "vehicles"}
            withImage
            imageSrc={"/icons/local_car_wash.svg"}
          />
          <SecondaryButton
            id="clients"
            text="Clientes"
            onClick={() => setIsActive("clients")}
            active={isActive === "clients"}
            withImage
            imageSrc={"/icons/supervised_user_circle.svg"}
          />
          <SecondaryButton
            id="analytics"
            text="Analytics"
            onClick={() => setIsActive("analytics")}
            active={isActive === "analytics"}
            withImage
            imageSrc={"/icons/insights.svg"}
          />
          <SecondaryButton
            id="workshop"
            text="Oficina"
            onClick={() => setIsActive("workshop")}
            active={isActive === "workshop"}
          />
        </div>
      </ContainerCard>
      <div>Profile</div>
    </div>
  )
}
