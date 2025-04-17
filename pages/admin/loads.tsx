import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AdminLayout } from "@lib/admin/ui/layout/AdminLayout";
import NotFoundPage from "pages/404";
import {
  Box,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Spinner,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import { useEffect, useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useFetchLoads, useNewLoadsCheck } from "@lib/loads/data/loadHooks";
import { toaster } from "@ui/index";

registerAllModules();

type LoadFormData = {
  LoadID: string;
  PickUpDate: string;
  DeliveryDate: string;
  driverId: string;
  brokerId: string;
  vehicles: {
    Vehicle: string;
    VehicleWeight: string;
    VehicleType: string;
    VehicleYear: string;
    VehicleMake: string;
    VehicleModel: string;
    VehicleColor: string;
    VehicleLotNumber: string;
  };
  loadAddress: {
    Location: string;
    Contact: string;
    ContactPhone: string;
  };
  notes: string;
  payment: {
    Payment: string;
    PaymentDate: string;
    PaymentAmount: string;
    PaymentMethod: string;
    PaymentStatus: string;
  };
};

const Loads = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState(() => {
    return Array(20)
      .fill("")
      .map(() => Array(6).fill(""));
  });
  const uploadLoad = useNewLoadsCheck();

  const [headers, setHeaders] = useState([
    "Load ID",
    "Pick Up",
    "Delivery",
    "Driver",
    "Vehicle",
    "Status",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newLoad, setNewLoad] = useState<LoadFormData>({
    LoadID: "",
    PickUpDate: "",
    DeliveryDate: "",
    driverId: "",
    brokerId: "",
    vehicles: {
      Vehicle: "",
      VehicleWeight: "",
      VehicleType: "",
      VehicleYear: "",
      VehicleMake: "",
      VehicleModel: "",
      VehicleColor: "",
      VehicleLotNumber: "",
    },
    loadAddress: {
      Location: "",
      Contact: "",
      ContactPhone: "",
    },
    notes: "",
    payment: {
      Payment: "",
      PaymentDate: "",
      PaymentAmount: "",
      PaymentMethod: "",
      PaymentStatus: "",
    },
  });
  const [tabs, setTabs] = useState([
    { id: 1, name: "Tab 1", content: "Content for Tab 1" },
  ]); // Initial tab data
  // Tab nemeh
  const handleAddTab = () => {
    const newTabId = tabs.length + 1;
    setTabs((prevTabs) => [
      ...prevTabs,
      {
        id: newTabId,
        name: `Tab ${newTabId}`,
        content: `Content for Tab ${newTabId}`,
      },
    ]);
  };
  // Function to handle renaming the tab
  const handleRenameTab = (
    e: React.ChangeEvent<HTMLInputElement>,
    tabId: number
  ) => {
    const newTabs = tabs.map((tab) =>
      tab.id === tabId ? { ...tab, name: e.target.value } : tab
    );
    setTabs(newTabs);
  };

  const [sheets, setSheets] = useState<Array<any>>([
    {
      data: data,
      headers: headers,
    },
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewLoad((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: keyof LoadFormData
  ) => {
    const { name, value } = e.target;
    setNewLoad((prev) => ({
      ...prev,
      [category]: { ...(prev[category] as object), [name]: value },
    }));
  };

  const handleAddLoad = async () => {
    console.log(newLoad);
    try {
      uploadLoad.mutate(newLoad, {
        onSuccess: () => {
          toaster.success("Success");

          // Reset the form fields
          setNewLoad({
            LoadID: "",
            PickUpDate: "",
            DeliveryDate: "",
            driverId: "",
            brokerId: "",
            vehicles: {
              Vehicle: "",
              VehicleWeight: "",
              VehicleType: "",
              VehicleYear: "",
              VehicleMake: "",
              VehicleModel: "",
              VehicleColor: "",
              VehicleLotNumber: "",
            },
            loadAddress: {
              Location: "",
              Contact: "",
              ContactPhone: "",
            },
            notes: "",
            payment: {
              Payment: "",
              PaymentDate: "",
              PaymentAmount: "",
              PaymentMethod: "",
              PaymentStatus: "",
            },
          });

          onClose();
        },
        onError: () => {
          toaster.error("Failed to save load");
        },
      });
    } catch (error) {
      console.error("Error adding load:", error);
    }
  };

  const { data: loadsData, isLoading } = useFetchLoads();

  useEffect(() => {
    if (Array.isArray(loadsData)) {
      const formattedData = loadsData.map((load) => [
        load.LoadID,
        load.PickUpDate,
        load.DeliveryDate,
        load.driverId,
        load.vehicles?.Vehicle || "",
        load.payment?.PaymentStatus || "",
      ]);
      setData(formattedData);
    }
  }, [loadsData]);

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
    editable: false,
    minRows: 20,
    minCols: 6,
    afterGetColHeader: (col: number, TH: HTMLTableCellElement) => {
      TH.innerHTML = `<div contentEditable="true" class="customHeader">${
        headers[col] || ""
      }</div>`;
      const div = TH.querySelector(".customHeader");
      if (div) {
        div.addEventListener("blur", (e: any) => {
          const newValue = e.target.innerHTML;
          const newHeaders = [...headers];
          newHeaders[col] = newValue;
          setHeaders(newHeaders);
        });
      }
    },
  };

  const handleAddSheet = () => {
    setSheets((prevSheets) => [
      ...prevSheets,
      {
        data: Array(20)
          .fill("")
          .map(() => Array(6).fill("")),
        headers: headers,
      },
    ]);
  };

  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
      <Box p={6}>
        <Heading size="lg" mb={6}>
          Loads
        </Heading>

        <HStack spacing={4} mb={6}>
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search loads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderRadius="md"
            />
          </InputGroup>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            onClick={onOpen}
            borderRadius="md"
          >
            Add Load
          </Button>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="green"
            onClick={handleAddTab}
          >
            Add Tab
          </Button>
        </HStack>

        <Tabs>
          <TabList style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {/* Render dynamic tabs */}
            {tabs.map((tab) => (
              <Tab key={tab.id}>
                <Input
                  value={tab.name}
                  onChange={(e) => handleRenameTab(e, tab.id)}
                  size="sm"
                  variant="unstyled"
                  width="100px"
                  textAlign="center"
                />
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {tabs.map((tab) => (
              <TabPanel key={tab.id}>
                <Box
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  boxShadow="sm"
                  h="calc(100vh - 280px)"
                  overflow="hidden"
                >
                  <Text>{tab.content}</Text>
                  {isLoading ? (
                    <Spinner size="xl" />
                  ) : data.length === 0 ? (
                    <Text>No loads found.</Text>
                  ) : (
                    <HotTable
                      data={data}
                      colHeaders={headers}
                      rowHeaders={true}
                      licenseKey="non-commercial-and-evaluation"
                      width="100%"
                      height="100%"
                      stretchH="all"
                      contextMenu={true}
                      filters={true}
                      dropdownMenu={true}
                      manualColumnResize={true}
                      manualRowResize={true}
                      columnSorting={true}
                      autoWrapRow={true}
                      autoWrapCol={true}
                      mergeCells={true}
                    />
                  )}
                  uu
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>

        {/* Add Load Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Load</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Load ID</FormLabel>
                <Input
                  name="LoadID"
                  value={newLoad.LoadID}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Pick Up Date</FormLabel>
                <Input
                  type="date"
                  name="PickUpDate"
                  value={newLoad.PickUpDate}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Delivery Date</FormLabel>
                <Input
                  type="date"
                  name="DeliveryDate"
                  value={newLoad.DeliveryDate}
                  onChange={handleInputChange}
                />
              </FormControl>

              <Heading size="sm" mb={2}>
                Vehicle Details
              </Heading>

              <FormControl mb={4}>
                <FormLabel>Vehicle Name</FormLabel>
                <Input
                  name="Vehicle"
                  value={newLoad.vehicles.Vehicle}
                  onChange={(e) => handleNestedInputChange(e, "vehicles")}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Vehicle Weight</FormLabel>
                <Input
                  type="number"
                  name="VehicleWeight"
                  value={newLoad.vehicles.VehicleWeight}
                  onChange={(e) => handleNestedInputChange(e, "vehicles")}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Vehicle Type</FormLabel>
                <Input
                  name="VehicleType"
                  value={newLoad.vehicles.VehicleType}
                  onChange={(e) => handleNestedInputChange(e, "vehicles")}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Vehicle Year</FormLabel>
                <Input
                  type="number"
                  name="VehicleYear"
                  value={newLoad.vehicles.VehicleYear}
                  onChange={(e) => handleNestedInputChange(e, "vehicles")}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Vehicle Make</FormLabel>
                <Input
                  name="VehicleMake"
                  value={newLoad.vehicles.VehicleMake}
                  onChange={(e) => handleNestedInputChange(e, "vehicles")}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Vehicle Model</FormLabel>
                <Input
                  name="VehicleModel"
                  value={newLoad.vehicles.VehicleModel}
                  onChange={(e) => handleNestedInputChange(e, "vehicles")}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Vehicle Color</FormLabel>
                <Input
                  name="VehicleColor"
                  value={newLoad.vehicles.VehicleColor}
                  onChange={(e) => handleNestedInputChange(e, "vehicles")}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Vehicle Lot Number</FormLabel>
                <Input
                  name="VehicleLotNumber"
                  value={newLoad.vehicles.VehicleLotNumber}
                  onChange={(e) => handleNestedInputChange(e, "vehicles")}
                />
              </FormControl>

              <Heading size="sm" mb={2}>
                Load Address
              </Heading>
              <FormControl mb={4}>
                <FormLabel>Location</FormLabel>
                <Input
                  name="Location"
                  value={newLoad.loadAddress.Location}
                  onChange={(e) => handleNestedInputChange(e, "loadAddress")}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  name="notes"
                  value={newLoad.notes}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleAddLoad}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </AdminLayout>
  );
};

export default withRequireLogin(Loads);
