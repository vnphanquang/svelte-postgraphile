<script lang="typescript">
  import { onMount } from 'svelte';
  import SvelteTable from 'svelte-table';
  import { Role } from '@services/graphql/generated/types';
  import type { CommonAccountPayloadFragment } from '@services/graphql/generated/types';
  import AccountApi from '@api/account';

  let accounts: CommonAccountPayloadFragment[] = [];
  
  const columns = [
    {
      key: 'id',
      title: 'ID',
      value: (v: CommonAccountPayloadFragment) => v.id,
      sortable: false,
      headerClass: "text-left",
    },
    {
      key: 'firstName',
      title: 'First Name',
      value: (v: CommonAccountPayloadFragment) => v.firstName,
      sortable: true,
      headerClass: "text-left",
    },
    {
      key: 'lastName',
      title: 'Last Name',
      value: (v: CommonAccountPayloadFragment) => v.lastName,
      sortable: true,
      headerClass: "text-left",
    },
    {
      key: 'role',
      title: 'Role',
      value: (v: CommonAccountPayloadFragment) => v.role,
      sortable: true,
      filterOptions: [Role.Admin, Role.User],
      headerClass: "text-left",
    },
    {
      key: 'email',
      title: 'Email',
      value: (v: CommonAccountPayloadFragment) => v.email,
      sortable: true,
      headerClass: "text-left",
    },
    {
      key: 'createdAt',
      title: 'Created At',
      value: (v: CommonAccountPayloadFragment) => new Date(v.createdAt).toLocaleDateString(),
      sortable: true,
      headerClass: "text-left",
    },
    {
      key: 'updatedAt',
      title: 'Updated At',
      value: (v: CommonAccountPayloadFragment) => v.updatedAt && new Date(v.updatedAt).toLocaleDateString(),
      sortable: true,
      headerClass: "text-left",
    },
  ];

  onMount(async () => {
    accounts = await AccountApi.getAllAccounts();

  })
</script>


<div class="container mt-8 flex flex-col justify-center items-center">
  <header class="text-xl mb-8 font-bold">All Registered Accounts</header>
  <SvelteTable
    columns="{columns}"
    rows="{accounts}"
    classNameTable="rounded-md"
    classNameThead="bg-gray-500"
    classNameRow="bg-gray-200"
  >
  </SvelteTable>
</div>


