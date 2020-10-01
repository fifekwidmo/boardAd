export const initialState = {
  posts: {
    data: [
      { id: 1, title: 'Toyota Celica VII', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum', dateOfPublication: '2020-09-10', dateOfUpdate: '2020-09-10', email: 'andrzej@gmail.com', status: 'draft', price: '3000$'},
      { id: 2, title: 'Opel Astra', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum', dateOfPublication: '2020-09-10', dateOfUpdate: '2020-09-10', email: 'kowalski@gmail.com', status: 'draft', price: '2000$'},
      { id: 3, title: 'Fiat Seicento', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum', dateOfPublication: '2020-05-10', dateOfUpdate: '2020-06-10', email: 'ferdynand@gmail.com', status: 'draft', price: '12225$'},
      { id: 4, title: 'Toyota Celica VI', description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum', dateOfPublication: '2020-02-10', dateOfUpdate: '2020-03-10', email: 'hosef@gmail.com', status: 'draft', price: '200000$'},
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  role: 'admin',
};