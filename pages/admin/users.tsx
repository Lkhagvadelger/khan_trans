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
  Editable,
} from "@chakra-ui/react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";

registerAllModules();

type LoadFormData = {
  LoadID: string;
  PickUpDate: string;
  DeliveryDate: string;
  driverId: string;
  brokerId: string;
  vehicle: {
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

const AdminUsers = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState(() => {
    return Array(20)
      .fill("")
      .map(() => Array(6).fill(""));
  });

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
    vehicle: {
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
    try {
      const response = await fetch("/api/loads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLoad),
      });

      if (!response.ok) throw new Error("Failed to add load");
      const newEntry = await response.json();
      setData((prev) => [...prev, Object.values(newEntry)]);
      setNewLoad({
        LoadID: "",
        PickUpDate: "",
        DeliveryDate: "",
        driverId: "",
        brokerId: "",
        vehicle: {
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
    } catch (error) {
      console.error("Error adding load:", error);
    }
  };

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
      TH.innerHTML = `<div contenteditable="true" class="customHeader">${
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
        </HStack>

        <Box
          bg="white"
          p={4}
          borderRadius="lg"
          boxShadow="sm"
          h="calc(100vh - 280px)"
          overflow="hidden"
        >
          <HotTable
            data={data}
            settings={{
              ...hotSettings,
              comments: {},
              formulas: {},
              manualColumnResize: true,
              manualRowResize: true,
              columnSorting: true,
              autoWrapRow: true,
              autoWrapCol: true,
              mergeCells: true,
            }}
            colHeaders={headers}
            rowHeaders={true}
          />
        </Box>

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
                <FormLabel>Vehicle</FormLabel>
                <Input
                  name="Vehicle"
                  value={newLoad.vehicle.Vehicle}
                  onChange={(e) => handleNestedInputChange(e, "vehicle")}
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
              <Button colorScheme="blue" mr={3} onClick={handleAddLoad}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </AdminLayout>
  );
};

export default withRequireLogin(AdminUsers);
