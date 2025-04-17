import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AdminLayout } from "@lib/admin/ui/layout/AdminLayout";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import NotFoundPage from "pages/404";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AdminCalendar = () => {
  const { user } = useAuth();
  const events = [
    {
      title: "Sample Event",
      start: new Date(),
      end: new Date(),
    },
  ];

  if (user?.role !== UserRole.ADMIN) {
    return <NotFoundPage />;
  }

  return (
    <AdminLayout>
      <VStack spacing={6} align="stretch" p={6}>
        <Heading size="lg">Calendar</Heading>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm" height="700px">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
          />
        </Box>
      </VStack>
    </AdminLayout>
  );
};

export default withRequireLogin(AdminCalendar);
