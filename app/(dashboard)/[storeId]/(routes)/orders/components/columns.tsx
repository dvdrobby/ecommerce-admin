"use client"

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string
  product: string
  address: string
  phone: string
  isPaid: boolean
  totalPrice: string
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  }
]
