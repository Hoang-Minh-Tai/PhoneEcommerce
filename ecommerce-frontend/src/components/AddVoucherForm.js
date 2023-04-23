import React, { useContext, useState } from "react";
import { Form, Modal, Button, Header } from "semantic-ui-react";
import Context from "../config/context";

export default function AddVoucherForm(props) {
  const context = useContext(Context);
  const { addVoucher } = context;
  const { voucher } = props;

  const [code, setCode] = useState(voucher ? voucher.code : "");
  const [discount, setDiscount] = useState(voucher ? voucher.discount : "");
  const [expirationDate, setExpirationDate] = useState(
    voucher ? voucher.expirationDate : ""
  );

  const handleSubmit = async () => {
    const newVoucher = {
      code: code,
      discount: parseFloat(discount),
      expirationDate: expirationDate,
    };
    await addVoucher(newVoucher);
    alert("Add voucher successfully!");
    setCode("");
    setDiscount("");
    setExpirationDate("");
  };

  return (
    <Modal
      trigger={
        <Button
          primary
          fluid={props.size ? false : true}
          size={props.size || "large"}
        >
          {voucher ? "Update" : "Add New Voucher"}
        </Button>
      }
    >
      <Modal.Header>
        {" "}
        {voucher ? "Update Voucher" : "Add New Voucher"}
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            name="code"
            label="Code"
            placeholder="Voucher code"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            required
          />
          <Form.Input
            name="discount"
            label="Discount"
            placeholder="Discount"
            type="number"
            min="0"
            max="100"
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            required
          />
          <Form.Input
            name="expirationDate"
            label="Expiration Date"
            placeholder="Expiration Date"
            type="date"
            onChange={(e) => setExpirationDate(e.target.value)}
            value={expirationDate}
          />
          <Button type="submit"> {voucher ? "Update" : "Add"}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
