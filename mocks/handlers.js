// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.post('api/auth/register', (req, res, ctx) => {
    return res(
      ctx.cookie('set-cookie', 'abc-123'),
      ctx.json({
        tokens: {
          accessToken: 'string',
          refreshToken: 'string',
        },
        user: {
          id: 1,
          username: 'jongyeol',
        },
      }),
    );
  }),

  rest.get('/api/auction/metals', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          createdAt: '2022-12-25 17:50:30',
          updatedAt: '2022-12-25 17:50:30',
          id: 1,
          name: '구리',
          isDeleted: 'N',
          metalOptions: [
            {
              createdAt: '2022-12-25 17:50:30',
              updatedAt: '2022-12-25 17:50:30',
              id: 0,
              name: 'Class A',
              isDeleted: 'N',
            },
            {
              createdAt: '2022-12-25 17:50:30',
              updatedAt: '2022-12-25 17:50:30',
              id: 1,
              name: 'Class B',
              isDeleted: 'N',
            },
          ],
        },
        {
          createdAt: '2022-12-25 17:50:30',
          updatedAt: '2022-12-25 17:50:30',
          id: 2,
          name: '금',
          isDeleted: 'N',
          metalOptions: [
            {
              createdAt: '2022-12-25 17:50:30',
              updatedAt: '2022-12-25 17:50:30',
              id: 3,
              name: 'Class C',
              isDeleted: 'N',
            },
            {
              createdAt: '2022-12-25 17:50:30',
              updatedAt: '2022-12-25 17:50:30',
              id: 4,
              name: 'Class D',
              isDeleted: 'N',
            },
          ],
        },
      ]),
    );
  }),

  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true');

    return res(
      // Respond with a 200 status code
      ctx.status(200),
    );
  }),

  rest.get('/auctions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        auctions: {
          content: [
            {
              id: 'b122620e-f61e-4160-896d-9e1d1d785637',
              auctionType: 'NORMAL',
              endTime: '2022-12-25 17:50:30',
              auctionStatusType: 'ACTIVE',
              description: '상세설명',
              auctionImageUrl: 'https://img.hankyung.com/photo/202105/01.26337392.1-1200x.jpg',
              isDisplayed: 'Y',
              hostUser: {
                createdAt: '2022-10-23 16:12:07',
                updatedAt: '2022-10-23 16:12:07',
                id: 1,
                business: {
                  businessType: 'PERSONAL',
                  businessName: '수원상사',
                  representative: '홍길동',
                  registrationNumber: '1234512345',
                  licenceImageUrl: 'www.image-url.com',
                },
                personal: {
                  name: '김직원',
                  email: 'apple@gmail.com',
                  password: '$2a$10$6Qa0A2hWlh7Mu4nDyHNVze/j5kCj9o6kwQ52BijL3Kqr2WKJzk05C',
                },
                account: {
                  bank: '신한은행',
                  accountNumber: '110123123123',
                  accountHolder: '홍길동',
                },
                isEnabled: 'Y',
                isDeleted: 'Y',
              },
              bids: [],
              winningBid: null,
              createdAt: '2022-10-27 16:53:10',
              updatedAt: '2022-10-27 16:53:10',
              auctionItem: {
                metalId: 1,
                metalName: '구리',
                metalOptionId: 1,
                metalOptionName: '구리 금속 옵션 1',
                amount: 10.0,
                price: 9500,
              },
            },
            {
              id: 'b122620e-f61e-4160-896d-9e1d1d785638',
              auctionType: 'REVERSE',
              endTime: '2022-11-01 17:50:30',
              auctionStatusType: 'ACTIVE',
              description: '상세설명',
              auctionImageUrl: 'https://cdn.mos.cms.futurecdn.net/gwavbWSqZFoTpZpdqMGQU6.jpg',
              isDisplayed: 'Y',
              hostUser: {
                createdAt: '2022-10-23 16:12:07',
                updatedAt: '2022-10-23 16:12:07',
                id: 1,
                business: {
                  businessType: 'PERSONAL',
                  businessName: '수원상사',
                  representative: '홍길동',
                  registrationNumber: '1234512345',
                  licenceImageUrl: 'www.image-url.com',
                },
                personal: {
                  name: '김직원',
                  email: 'apple@gmail.com',
                  password: '$2a$10$6Qa0A2hWlh7Mu4nDyHNVze/j5kCj9o6kwQ52BijL3Kqr2WKJzk05C',
                },
                account: {
                  bank: '신한은행',
                  accountNumber: '110123123123',
                  accountHolder: '홍길동',
                },
                isEnabled: 'Y',
                isDeleted: 'Y',
              },
              bids: [],
              winningBid: null,
              createdAt: '2022-10-27 16:53:10',
              updatedAt: '2022-10-27 16:53:10',
              auctionItem: {
                metalId: 1,
                metalName: '구리',
                metalOptionId: 1,
                metalOptionName: '구리 금속 옵션 1',
                amount: 10.0,
                price: 9500,
              },
            },
          ],
          pageable: {
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
            offset: 0,
            pageNumber: 0,
            pageSize: 1,
            paged: true,
            unpaged: false,
          },
          last: true,
          totalElements: 1,
          totalPages: 1,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          first: true,
          size: 1,
          number: 0,
          numberOfElements: 1,
          empty: false,
        },
      }),
    );
  }),

  rest.post('/auction', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        auctionType: 'NORMAL',
        endTime: '2022-12-25 17:50:30',
        auctionStatusType: 'ACTIVE',
        description: '상세설명',
        auctionImageUrl: 'www.image-url.com',
        isDisplayed: 'Y',
        hostUser: {
          createdAt: '2022-12-25 17:50:30',
          updatedAt: '2022-12-25 17:50:30',
          id: 1,
          business: {
            businessType: 'PERSONAL',
            businessName: '수원상사',
            representative: '홍길동',
            registrationNumber: '1234512345',
            licenceImageUrl: 'www.image-url.com',
          },
          personal: {
            name: '김직원',
            email: 'apple@gmail.com',
            password: 'AsDf123!!',
          },
          account: {
            bank: '신한은행',
            accountNumber: '110123123123',
            accountHolder: '홍길동',
          },
          isEnabled: 'Y',
          isDeleted: 'Y',
        },
        bids: 1,
        winningBid: 1,
        createdAt: '2022-12-25 17:50:30',
        updatedAt: '2022-12-25 17:50:30',
        auctionItem: {
          metalId: 0,
          metalName: '구리',
          metalOptionId: 0,
          metalOptionName: '구리',
          amount: 10,
          price: 9500,
        },
      }),
    );
  }),

  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated');

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    );
  }),
];
