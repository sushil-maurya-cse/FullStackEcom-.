import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./Order.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import Metadata from "../layout/Metadata";
import LaunchIcon from "@material-ui/icons/Launch";

const Order = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", maxWidth: 300, flex: 0.1 },
    { field: "itemId", headerName: "Order ID", maxWidth: 0, flex: 0,hide:true },

    {
      field: "status",
      headerName: "Status",
      maxWidth: 150,
      flex: 0.1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Count",
      type: "number",
      maxWidth: 150,
      flex: 0.1,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      maxWidth: 270,
      flex: 0.1,
    },
    {
      field: "OrderDate",
      headerName: "Order Date",
      type: "string",
      maxWidth: 270,
      flex: 0.1,
    },

    {
      field: "actions",
      flex: 0.1,
      headerName: "Actions",
      maxWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "itemId")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: index+1,
        itemId:item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        OrderDate: item.createdAt.toString().substr(0,10)
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <Metadata title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={9}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
           
          />

          <Typography id="myOrdersHeading">{user.name} Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default Order;