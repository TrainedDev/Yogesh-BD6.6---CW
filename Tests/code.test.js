const request = require("supertest");
const http = require("http");
const { getAllEmployees } = require("../controller");
const { app } = require("../index");

jest.mock("../controller", () => ({
    ...jest.requireActual("../controller"),
    getAllEmployees: jest.fn()
}));

let server;

beforeAll(done => {
  server = http.createServer(app);
  server.listen(3001, done); 
});

afterAll(done => {
    server.close(done);
});

describe("test controller functions", () => {
    beforeEach(() => jest.clearAllMocks());

    it('should get all employees', async () => {
        let mockEmployees = [
            {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: 'Ankit Verma',
                email: 'ankit.verma@example.com',
                departmentId: 1,
                roleId: 3,
            },
          ];
        
        getAllEmployees.mockReturnValue(mockEmployees);
        expect(getAllEmployees()).toEqual(mockEmployees);
        expect(getAllEmployees().length).toBe(3);
    });
});

describe("test all the api's",  () => {
    it("this api should return all employees", async () => {
        let mockEmployees = [
            {
                employeeId: 1,
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: 'Ankit Verma',
                email: 'ankit.verma@example.com',
                departmentId: 1,
                roleId: 3,
            },
          ];

        const res = await request(server).get("/employees");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(mockEmployees);
    });

    it('this api should return employees by its id', async () => {
        const res = await request(server).get("/employees/details/1");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(  {
            employeeId: 1,
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            departmentId: 1,
            roleId: 1,
        });
    });
});
