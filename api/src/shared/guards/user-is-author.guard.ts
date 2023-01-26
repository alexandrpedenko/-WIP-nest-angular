import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PostsService } from '@posts/service/posts.service';

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
  constructor(private postsService: PostsService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return this.validateRequest(context);
  }

  private async validateRequest(execContext: ExecutionContext): Promise<boolean>{
    const { user: { id: userId }, params: { postId }} = execContext.switchToHttp().getRequest();
    const post = await this.postsService.getPostById(postId);
    let hasPermission = false;
    if (post) {
      hasPermission = post.author.toString() === userId;
    }
    return hasPermission;
  }
}