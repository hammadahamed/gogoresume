import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { OpenAIModule } from '../openai/openai.module';
import { ResumeService } from './resume.sevice';
import { ResumeTweakerService } from './resume-tweaker.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [OpenAIModule, JwtModule],
  controllers: [ResumeController],
  providers: [
    ResumeTweakerService,
    ResumeService,
    JwtService,
    AuthService,
    UsersService,
  ],
})
export class ResumeModule {}

// {
//     "data": {
//         "professionalSummary": [
//             "John Doe",
//             "john.doe@example.com",
//             "123-456-7890"
//         ],
//         "experiences": [
//            "worked as software engineer at google. built a new feature for the search engine.",
//            "built analytics dashboard for the company.",
//         ]
//     },
//     "jobDescriptions": "some job description",
//     "userPrompt": "make this sound more like i have more experience in vue.js, but don't lie more",

// }
