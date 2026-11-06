"use client";

import { useState } from "react";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import CustomerDetailSheet from "@/components/customers/CustomerDetailSheet";
import CustomersTable from "@/components/customers/CustomersTable";
import { useCustomers } from "@/hooks/useCustomers";

export default function CustomersScreen() {
  const customers = useCustomers();
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? (customers.find((c) => c.id === openId) ?? null) : null;

  return (
    <PageContainer>
      <PageHeader title="Customers" subtitle={`${customers.length} patrons — lifetime value and VIPs at a glance.`} />
      <CustomersTable customers={customers} onView={(c) => setOpenId(c.id)} />
      <CustomerDetailSheet customer={open} onClose={() => setOpenId(null)} />
    </PageContainer>
  );
}
