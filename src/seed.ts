import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const employees = [];
  for (let i = 0; i < 5; i++) {
    const employee = await prisma.employee.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(), 
        phone: faker.phone.number(),
        gender: i % 2 === 0 ? "Male" : "Female",
        bio: faker.lorem.paragraph(),
        skills: [faker.hacker.verb(), faker.hacker.noun()],
        city: faker.location.city(),
        dob: faker.date.birthdate().toISOString(),
        designation: faker.person.jobTitle(),
        address: faker.location.streetAddress(),
        fb_link: faker.internet.url(),
        portfolio_link: faker.internet.url(),
        training: { details: faker.lorem.paragraph() },
        access_token: faker.internet.password(),
        refresh_token: faker.internet.password(),
        job_preference: ["Full-time", "Remote"],
        password: "00000000", 
        profile_picture:
          "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
      },
    });
    employees.push(employee);
  }

  const companies = [];
  for (let i = 0; i < 5; i++) {
    const company = await prisma.company.create({
      data: {
        about: faker.lorem.sentence(),
        category: "Technology",
        company_name: faker.company.name(),
        founded: faker.date.past(),
        location: faker.location.city(),
        address: faker.location.streetAddress(),
        website: faker.internet.url(),
        fb_link: faker.internet.url(),
        insta_link: faker.internet.url(),
        image_url: [
          "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
          "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
        ],
        image_keys: ["image1-key", "image2-key"],
        email: faker.internet.email(),
        password: "00000000", // Password set to '00000000'
        access_token: faker.internet.password(),
        refresh_token: faker.internet.password(),
      },
    });
    companies.push(company);
  }

  const internships = [];
  for (let i = 0; i < 5; i++) {
    const internship = await prisma.internship.create({
      data: {
        position: faker.person.jobTitle(),
        companyId: companies[i % companies.length].id,
        salary: `${faker.number.int({ min: 1000, max: 5000 })} USD`, // Updated method
        jobType: i % 2 === 0 ? "FULL_TIME" : "PART_TIME",
        openings: faker.number.int({ min: 1, max: 5 }), // Updated method
        level: "Junior",
        description: faker.lorem.paragraph(),
        location: faker.location.city(),
        responsibilities: [faker.hacker.verb(), faker.hacker.noun()],
        requirements: [faker.hacker.verb(), faker.hacker.noun()],
        requiredSkills: [faker.hacker.verb(), faker.hacker.noun()],
        tags: ["Remote", "Immediate Start"],
        applicationEnds: faker.date.future(),
      },
    });
    internships.push(internship);
  }

  for (let i = 0; i < 5; i++) {
    await prisma.application.create({
      data: {
        employeeId: employees[i % employees.length].id,
        internshipId: internships[i % internships.length].id,
        appliedAt: faker.date.past(),
      },
    });
  }

  for (let i = 0; i < 5; i++) {
    await prisma.experience.create({
      data: {
        employeeId: employees[i % employees.length].id,
        designation: faker.person.jobTitle(),
        company_name: faker.company.name(),
        start_date: faker.date.past(),
        end_date: faker.date.recent(),
        job_description: faker.lorem.paragraph(),
      },
    });
  }

  for (let i = 0; i < 5; i++) {
    await prisma.documents.create({
      data: {
        employeeId: employees[i % employees.length].id,
        type: "Resume",
        file_key: `file-key-${i}`,
        file_url: "https://via.placeholder.com/150",
      },
    });
  }

  for (let i = 0; i < 5; i++) {
    await prisma.education.create({
      data: {
        employeeId: employees[i % employees.length].id,
        type: "Undergraduate",
        name: "University of Example",
        degree_name: faker.person.jobTitle(),
        start_date: faker.date.past(),
        studying_here: true,
        country: faker.location.country(),
        city: faker.location.city(),
        end_date: null,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
