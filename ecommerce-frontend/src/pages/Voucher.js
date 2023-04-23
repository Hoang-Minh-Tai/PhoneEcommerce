import React, { useContext, useEffect } from "react";
import { Button, Header, Table } from "semantic-ui-react";
import AddVoucherForm from "../components/AddVoucherForm";
import Context from "../config/context";

function Voucher() {
  const { vouchers, getVouchers, deleteVoucher } = useContext(Context);

  useEffect(() => {
    getVouchers();
  }, []);

  const handleUpdate = (voucher) => {
    // handle update logic
  };

  const handleDelete = (voucher) => {
    deleteVoucher(voucher.id);
  };

  return (
    <div>
      <Header as="h2">Vouchers</Header>
      <AddVoucherForm />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Discount</Table.HeaderCell>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Expire Date</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {vouchers.map((voucher) => (
            <Table.Row key={voucher.id}>
              <Table.Cell>{voucher.discount}%</Table.Cell>
              <Table.Cell>{voucher.code}</Table.Cell>
              <Table.Cell>{voucher.expirationDate || "null"}</Table.Cell>
              <Table.Cell>
                <AddVoucherForm voucher={voucher} size={"medium"} />
                <Button color="red" onClick={() => handleDelete(voucher)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Voucher;
