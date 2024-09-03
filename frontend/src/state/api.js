// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
//   reducerPath: "adminApi",
//   tagTypes: [
//     "User",
//     "Products",
//     "Customers",
//     "Transactions",
//     "Geography",
//     "Sales",
//     "Admins",
//     "Performance",
//     "Dashboard",
//   ],
//   endpoints: (build) => ({
//     getUser: build.query({
//       query: (id) => `general/user/${id}`,
//       providesTags: ["User"],
//     }),
//     getProducts: build.query({
//       query: () => "client/products",
//       providesTags: ["Products"],
//     }),
//     getCustomers: build.query({
//       query: () => "client/customers",
//       providesTags: ["Customers"],
//     }),
//     getTransactions: build.query({
//       query: ({ page, pageSize, sort, search }) => ({
//         url: "client/transactions",
//         method: "GET",
//         params: { page, pageSize, sort, search },
//       }),
//       providesTags: ["Transactions"],
//     }),
//     getGeography: build.query({
//       query: () => "client/geography",
//       providesTags: ["Geography"],
//     }),
//     getSales: build.query({
//       query: () => "sales/sales",
//       providesTags: ["Sales"],
//     }),
//     getAdmins: build.query({
//       query: () => "management/admins",
//       providesTags: ["Admins"],
//     }),
//     getUserPerformance: build.query({
//       query: (id) => `management/performance/${id}`,
//       providesTags: ["Performance"],
//     }),
//     getDashboard: build.query({
//       query: () => "general/dashboard",
//       providesTags: ["Dashboard"],
//     }),
//   }),
// });

// export const {
//   useGetUserQuery,
//   useGetProductsQuery,
//   useGetCustomersQuery,
//   useGetTransactionsQuery,
//   useGetGeographyQuery,
//   useGetSalesQuery,
//   useGetAdminsQuery,
//   useGetUserPerformanceQuery,
//   useGetDashboardQuery,
// } = api;






import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    addTransaction: build.mutation({
      query: (newTransaction) => ({
        url: "client/transactions",
        method: "POST",
        body: newTransaction,
      }),
      invalidatesTags: ["Transactions"],
    }),
    addCustomer: build.mutation({
      query: (newCustomer) => ({
        url: "client/customers",
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: ["Customers"], // This invalidates the customers cache
    }),
    deleteCustomer: build.mutation({
      query: (customerId) => ({
        url: `client/customers/${customerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"], // This invalidates the customers cache
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useAddTransactionMutation,
  useAddCustomerMutation,
  useDeleteCustomerMutation,
} = api;
