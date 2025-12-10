import Elysia from "elysia";
import { approveRequest, checkoutItem, checkOverdue, createBorrowRequest, getAllRequests, getBorrowRequest, getUserBorrowHistory, rejectRequest, returnItem } from "../services/borrow.service";
import { borrowPagination, createBorrowRequestRequest, getRequestId, myRequestsRequest, returnItemRequest } from "../validators/borrow.validator";
import { errorResponse, successResponse } from "../utils/response.util";

export const borrowController = (app: Elysia) => {
    return app.group('/borrow', (app) => 
        app
        .guard({
            beforeHandle: (ctx: any) => {
                const {user, set} = ctx
                console.log(user)
                if (!user) {
                    set.status = 401
                    throw errorResponse(
                        "unauthorized",
                        401,
                    )
                }
            }
        }, (app) => 
            app
            // TODO: find a solution for this bullshit (remove any)
            .post('/request', async ({body, user, set}: any) => {
                try {
                    const res = await createBorrowRequest(
                        user.id, 
                        body.itemId, 
                        body.days
                    )
                    return successResponse(res)
                } catch (error) {
                    console.log('create request error', error)
                    set.status = 500;
                    return errorResponse(
                        error instanceof Error
                        ? error.message
                        : 'failed to create borrow request'
                    );
                }
            }, {
                body: createBorrowRequestRequest
            }) 
            .get('/my-requests', async ({query, user, set}: any) => {
                try {
                    const page = Number(query.page) || 1
                    const limit = Number(query.limit) || 10
                    const status = query.status

                    const res = await getAllRequests(page, limit, status, user.id)
                    return successResponse(res)
                } catch (error) {
                    console.log('get my requests error', error)
                    set.status = 500;
                    return errorResponse(
                        error instanceof Error
                        ? error.message
                        : 'failed to get my borrow requests'
                    );
                }
            }, {
                query: myRequestsRequest
            })
            .get('/request/:id', async ({params, user, set}: any) => {
                try {
                    const res = await getBorrowRequest(
                        params.id, 
                        user.id
                    )
                    return successResponse(res)
                } catch (error) {
                    console.log('get my request error', error)
                    set.status = 500;
                    return errorResponse(
                        error instanceof Error
                        ? error.message
                        : 'failed to get my request'
                    );
                }
            })
            .post('/checkout/:id', async ({params, user, set}: any) => {
                try {
                    const res = await checkoutItem(
                        params.id,
                        user.id
                    )
                    return successResponse(res)
                } catch (error) {
                    console.log('failed to checkout request', error)
                    set.status = 500;
                    return errorResponse(
                        error instanceof Error
                        ? error.message
                        : 'failed to checkout request'
                    );
                }
            }, {
                params: getRequestId
            })
            .post('/return/:id', async ({params, user, set}: any) => {
                try {   
                    const res = await returnItem(
                        params.id, 
                        user.id
                    )
                    return successResponse(res)
                } catch (error) {
                    console.log('failed to return request', error)
                    set.status = 500;
                    return errorResponse(
                        error instanceof Error
                        ? error.message
                        : 'failed to return request'
                    );
                }
            }, {
                params: getRequestId
            })
            .get('/history', async ({query, user, set}: any) => {
                try {
                    const page = Number(query.page) || 1
                    const limit = Number(query.limit) || 10
                    
                    const res = await getUserBorrowHistory(
                        user.id,
                        page, 
                        limit
                    )
                    return successResponse(res)
                } catch (error) {
                    console.log('failed to get history request', error)
                    set.status = 500;
                    return errorResponse(
                        error instanceof Error
                        ? error.message
                        : 'failed to get history request'
                    );
                }
            }, {
                query: borrowPagination
            })
            .get('/payment-status/:id', async ({ params, user, set }: any) => {
                if (!user) {
                    set.status = 401
                    return errorResponse(
                       'unauthorized',
                       401
                    )
                }

                try {
                    const request = await getBorrowRequest(params.id, user.id)

                    return successResponse({
                        status: request.status,
                        paymentUrl: request.paymentUrl,
                        paymentStatus: request.paymentStatus,
                        totalAmount: request.totalAmount,
                        paidAt: request.paidAt
                    })
                } catch (error) {
                    return errorResponse(
                        error instanceof Error
                        ? error.message
                        : 'failed to get borrow request'
                    );
                }
            }, {
                params: getRequestId
            })
            .guard({
                beforeHandle: ({ user, set }: any) => {
                    if (!user || user.role !== 'ADMIN') {
                        set.status = 403
                        return errorResponse('Forbidden: Admin only', 403)
                    }
                }
            }, (app) => 
                app
                .get('/admin/requests', async ({query, set}: any) => {
                    try {
                        const page = Number(query.page) || 1
                        const limit = Number(query.limit) || 10
                        const status = query.status
                        
                        const res = await getAllRequests(page, limit, status)
                        return successResponse(res)
                    } catch (error) {
                        console.log('failed to get admin requests', error)
                        set.status = 500;
                        return errorResponse(
                            error instanceof Error
                            ? error.message
                            : 'failed to get admin requests'
                        );
                    }
                }, {
                    query: borrowPagination
                })
                .post('/admin/approve/:id', async ({params, user, set}: any) => {
                     try {
                        const res = await approveRequest(
                            params.id, 
                            user.id,
                        )
                        return successResponse(res)
                    } catch (error) {
                        console.log('failed to approve request', error)
                        set.status = 500;
                        return errorResponse(
                            error instanceof Error
                            ? error.message
                            : 'failed to approve request'
                        );
                    }
                }, {
                    params: getRequestId
                })
                .post('/admin/reject/:id', async ({params, user, set}: any) => {
                    try {
                        const res = await rejectRequest(
                            params.id, 
                            user.id,
                        )
                        return successResponse(res)
                    } catch (error) {
                        console.log('failed to reject request', error)
                        set.status = 500;
                        return errorResponse(
                            error instanceof Error
                            ? error.message
                            : 'failed to reject request'
                        );
                    }
                })
                .get('/admin/overdue', async ({set}) => {
                    try {
                        const res = await checkOverdue()
                        return successResponse(res)
                    } catch (error) {
                        console.log('failed to check overdue requests', error)
                        set.status = 500;
                        return errorResponse(
                            error instanceof Error
                            ? error.message
                            : 'failed to check overdue requests'
                        );
                    }
                })
            )
        )
    )
}