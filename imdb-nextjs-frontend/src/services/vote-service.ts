import { BasePrivateService } from "./base-private-service";

export interface Vote extends CreateVoteRequest {
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface CreateVoteRequest {
  movieId: string;
  userId: string;
  value: number;
}

export class VoteService extends BasePrivateService {
  public static createVote(data: CreateVoteRequest) {
    return this.buildAxiosInstance().post<Vote>("/votes", data);
  }
}
