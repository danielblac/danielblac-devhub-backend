import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { AddCommentDto } from './dto/comment.dto';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  @ApiQuery({ name: 'featured', required: false, type: Boolean })
  async findAll(@Query('featured') featured?: boolean) {
    return this.projectsService.findAll(featured);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Project found' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Project updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Project deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }

  @Post(':id/like')
  @ApiResponse({ status: 200, description: 'Project liked' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async like(@Param('id') id: string) {
    return this.projectsService.likeProject(id);
  }

  @Post(':id/view')
  @ApiResponse({ status: 200, description: 'View counted' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async view(@Param('id') id: string) {
    return this.projectsService.viewProject(id);
  }

  @Post(':id/comment')
  @ApiResponse({ status: 200, description: 'Comment added' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async addComment(
    @Param('id') id: string,
    @Body() addCommentDto: AddCommentDto,
  ) {
    return this.projectsService.addComment(id, addCommentDto);
  }
}
