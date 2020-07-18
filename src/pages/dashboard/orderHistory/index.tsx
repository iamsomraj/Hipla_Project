import React, { Component } from 'reactn';
import { Helmet } from "react-helmet";
import { HOC } from '../../../util/HOC';

type props = {
    history: any
};
type states = {
};

class OrderHistory extends Component<props, states> {
    render() {
        return (
            <>
                <Helmet>
                    <title>Contatrack | Order History</title>
                </Helmet>

                <div className="innerwrapperbody">
						<div className="topInnerHeading">
							<h2 className="upper-heading">Order History</h2>

							<button className="exportbtn">
								<i className="fa fa-cloud-download"></i>
								Export to CSV
							</button>
						</div>


						<div className="orderHistory margin20">

							<div className="tableprt">
								<table cellPadding="0" cellSpacing="0">
									<thead>
										<tr>

											<th>
												<div className="order-check">
													<input type="checkbox" name="check" value="check" />
													<label htmlFor="">&nbsp;</label>
												</div>
											</th>
											<th>Order #</th>
											<th>Billing Date</th>
											<th>Amount</th>


										</tr>
									</thead>

									<tbody>
										<tr>
											<td>
												<div className="order-check">
													<input type="checkbox" name="check" value="check" />
													<label htmlFor="" >&nbsp;</label>
												</div>
											</td>
											<td title="Order #">
												21435678953
											</td>
											<td title="Billing Date">
												4/05/2020
											</td>
											<td title="Amount">
												<b>
													Rs. 46759
												</b>

											</td>

										</tr>

										<tr>
											<td>
												<div className="order-check">
                                                <input type="checkbox" name="check" value="check" />
													<label htmlFor="">&nbsp;</label>
												</div>
											</td>
											<td title="Order #">
												21435678953
											</td>
											<td title="Billing Date">
												4/05/2020
											</td>
											<td title="Amount">
												<b>
													Rs. 46759
												</b>

											</td>

										</tr>

										<tr>
											<td>
												<div className="order-check">
                                                <input type="checkbox" name="check" value="check" />
													<label htmlFor="">&nbsp;</label>
												</div>
											</td>
											<td title="Order #">
												21435678953
											</td>
											<td title="Billing Date">
												4/05/2020
											</td>
											<td title="Amount">
												<b>
													Rs. 46759
												</b>

											</td>

										</tr>

										<tr>
											<td>
												<div className="order-check">
                                                <input type="checkbox" name="check" value="check" />
													<label htmlFor="">&nbsp;</label>
												</div>
											</td>
											<td title="Order #">
												21435678953
											</td>
											<td title="Billing Date">
												4/05/2020
											</td>
											<td title="Amount">
												<b>
													Rs. 46759
												</b>

											</td>

										</tr>





									</tbody>
								</table>
							</div>



						</div>

					</div>
            </>
        )
    }
}

export default HOC(OrderHistory);