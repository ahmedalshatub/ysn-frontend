import CustomerTypePage from "../components/CustomerTypePage";
import { CustomerRole } from "../types/Customers.types";

const ClientsPage = () => <CustomerTypePage customerType={CustomerRole.Client} />;

export default ClientsPage;
