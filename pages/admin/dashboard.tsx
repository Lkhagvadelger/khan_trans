import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AdminLayout } from "@lib/admin/ui/layout/AdminLayout";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import NotFoundPage from "pages/404";
import { useState } from "react";
import { tr } from "date-fns/locale";

registerAllModules();

const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const hotSettings = {
    licenseKey: "non-commercial-and-evaluation",
    colHeaders: true,
    rowHeaders: true,
    width: "100%",
    height: "100%",
    stretchH: "all",
    contextMenu: true,
    filters: true,
    dropdownMenu: true,
    afterChange: (changes: any) => {
      if (changes) {
        // Handle data changes here
        console.log("Data changed:", changes);
      }
    },
  };

  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
      <VStack spacing={6} align="stretch" p={6}>
        <Heading size="lg">Dashboard</Heading>
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          h="calc(100vh - 200px)"
          overflow="hidden"
        >
          <HotTable
            data={data}
            settings={hotSettings as any}
            colHeaders={["A", "B", "C", "D", "E"]}
            rowHeaders={true}
            columnSorting={true}
            filters={true}
            mergeCells={true}
            comments={true}
            formulas={true}
            manualColumnResize={true}
            manualRowResize={true}
            autoWrapRow={true}
            autoWrapCol={true}
          />
        </Box>
      </VStack>
    </AdminLayout>
  );
};

export default withRequireLogin(AdminDashboard);
