import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { AnthropicConversation, AnthropicConversationWithMessages, AnthropicError, AnthropicMessage, CreateAnthropicConversationBody, DashboardSummary, HealthStatus, SendAnthropicMessageBody, Specialization, Stage, StudyTip, UniversityProgram } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * Returns server health status
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List all conversations
 */
export declare const getListAnthropicConversationsUrl: () => string;
export declare const listAnthropicConversations: (options?: RequestInit) => Promise<AnthropicConversation[]>;
export declare const getListAnthropicConversationsQueryKey: () => readonly ["/api/anthropic/conversations"];
export declare const getListAnthropicConversationsQueryOptions: <TData = Awaited<ReturnType<typeof listAnthropicConversations>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAnthropicConversations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAnthropicConversations>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAnthropicConversationsQueryResult = NonNullable<Awaited<ReturnType<typeof listAnthropicConversations>>>;
export type ListAnthropicConversationsQueryError = ErrorType<unknown>;
/**
 * @summary List all conversations
 */
export declare function useListAnthropicConversations<TData = Awaited<ReturnType<typeof listAnthropicConversations>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAnthropicConversations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new conversation
 */
export declare const getCreateAnthropicConversationUrl: () => string;
export declare const createAnthropicConversation: (createAnthropicConversationBody: CreateAnthropicConversationBody, options?: RequestInit) => Promise<AnthropicConversation>;
export declare const getCreateAnthropicConversationMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAnthropicConversation>>, TError, {
        data: BodyType<CreateAnthropicConversationBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAnthropicConversation>>, TError, {
    data: BodyType<CreateAnthropicConversationBody>;
}, TContext>;
export type CreateAnthropicConversationMutationResult = NonNullable<Awaited<ReturnType<typeof createAnthropicConversation>>>;
export type CreateAnthropicConversationMutationBody = BodyType<CreateAnthropicConversationBody>;
export type CreateAnthropicConversationMutationError = ErrorType<unknown>;
/**
 * @summary Create a new conversation
 */
export declare const useCreateAnthropicConversation: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAnthropicConversation>>, TError, {
        data: BodyType<CreateAnthropicConversationBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAnthropicConversation>>, TError, {
    data: BodyType<CreateAnthropicConversationBody>;
}, TContext>;
/**
 * @summary Get conversation with messages
 */
export declare const getGetAnthropicConversationUrl: (id: number) => string;
export declare const getAnthropicConversation: (id: number, options?: RequestInit) => Promise<AnthropicConversationWithMessages>;
export declare const getGetAnthropicConversationQueryKey: (id: number) => readonly [`/api/anthropic/conversations/${number}`];
export declare const getGetAnthropicConversationQueryOptions: <TData = Awaited<ReturnType<typeof getAnthropicConversation>>, TError = ErrorType<AnthropicError>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAnthropicConversation>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAnthropicConversation>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAnthropicConversationQueryResult = NonNullable<Awaited<ReturnType<typeof getAnthropicConversation>>>;
export type GetAnthropicConversationQueryError = ErrorType<AnthropicError>;
/**
 * @summary Get conversation with messages
 */
export declare function useGetAnthropicConversation<TData = Awaited<ReturnType<typeof getAnthropicConversation>>, TError = ErrorType<AnthropicError>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAnthropicConversation>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Delete a conversation
 */
export declare const getDeleteAnthropicConversationUrl: (id: number) => string;
export declare const deleteAnthropicConversation: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteAnthropicConversationMutationOptions: <TError = ErrorType<AnthropicError>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAnthropicConversation>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteAnthropicConversation>>, TError, {
    id: number;
}, TContext>;
export type DeleteAnthropicConversationMutationResult = NonNullable<Awaited<ReturnType<typeof deleteAnthropicConversation>>>;
export type DeleteAnthropicConversationMutationError = ErrorType<AnthropicError>;
/**
 * @summary Delete a conversation
 */
export declare const useDeleteAnthropicConversation: <TError = ErrorType<AnthropicError>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAnthropicConversation>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteAnthropicConversation>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List messages in a conversation
 */
export declare const getListAnthropicMessagesUrl: (id: number) => string;
export declare const listAnthropicMessages: (id: number, options?: RequestInit) => Promise<AnthropicMessage[]>;
export declare const getListAnthropicMessagesQueryKey: (id: number) => readonly [`/api/anthropic/conversations/${number}/messages`];
export declare const getListAnthropicMessagesQueryOptions: <TData = Awaited<ReturnType<typeof listAnthropicMessages>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAnthropicMessages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAnthropicMessages>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAnthropicMessagesQueryResult = NonNullable<Awaited<ReturnType<typeof listAnthropicMessages>>>;
export type ListAnthropicMessagesQueryError = ErrorType<unknown>;
/**
 * @summary List messages in a conversation
 */
export declare function useListAnthropicMessages<TData = Awaited<ReturnType<typeof listAnthropicMessages>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAnthropicMessages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Send a message and receive an AI response (SSE stream)
 */
export declare const getSendAnthropicMessageUrl: (id: number) => string;
export declare const sendAnthropicMessage: (id: number, sendAnthropicMessageBody: SendAnthropicMessageBody, options?: RequestInit) => Promise<unknown>;
export declare const getSendAnthropicMessageMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof sendAnthropicMessage>>, TError, {
        id: number;
        data: BodyType<SendAnthropicMessageBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof sendAnthropicMessage>>, TError, {
    id: number;
    data: BodyType<SendAnthropicMessageBody>;
}, TContext>;
export type SendAnthropicMessageMutationResult = NonNullable<Awaited<ReturnType<typeof sendAnthropicMessage>>>;
export type SendAnthropicMessageMutationBody = BodyType<SendAnthropicMessageBody>;
export type SendAnthropicMessageMutationError = ErrorType<unknown>;
/**
 * @summary Send a message and receive an AI response (SSE stream)
 */
export declare const useSendAnthropicMessage: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof sendAnthropicMessage>>, TError, {
        id: number;
        data: BodyType<SendAnthropicMessageBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof sendAnthropicMessage>>, TError, {
    id: number;
    data: BodyType<SendAnthropicMessageBody>;
}, TContext>;
/**
 * @summary List all educational stages supported by Hayyaf
 */
export declare const getListStagesUrl: () => string;
export declare const listStages: (options?: RequestInit) => Promise<Stage[]>;
export declare const getListStagesQueryKey: () => readonly ["/api/masar/stages"];
export declare const getListStagesQueryOptions: <TData = Awaited<ReturnType<typeof listStages>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listStages>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListStagesQueryResult = NonNullable<Awaited<ReturnType<typeof listStages>>>;
export type ListStagesQueryError = ErrorType<unknown>;
/**
 * @summary List all educational stages supported by Hayyaf
 */
export declare function useListStages<TData = Awaited<ReturnType<typeof listStages>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List Saudi university specializations
 */
export declare const getListSpecializationsUrl: () => string;
export declare const listSpecializations: (options?: RequestInit) => Promise<Specialization[]>;
export declare const getListSpecializationsQueryKey: () => readonly ["/api/masar/specializations"];
export declare const getListSpecializationsQueryOptions: <TData = Awaited<ReturnType<typeof listSpecializations>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listSpecializations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listSpecializations>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListSpecializationsQueryResult = NonNullable<Awaited<ReturnType<typeof listSpecializations>>>;
export type ListSpecializationsQueryError = ErrorType<unknown>;
/**
 * @summary List Saudi university specializations
 */
export declare function useListSpecializations<TData = Awaited<ReturnType<typeof listSpecializations>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listSpecializations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Curated creative study tips
 */
export declare const getListStudyTipsUrl: () => string;
export declare const listStudyTips: (options?: RequestInit) => Promise<StudyTip[]>;
export declare const getListStudyTipsQueryKey: () => readonly ["/api/masar/study-tips"];
export declare const getListStudyTipsQueryOptions: <TData = Awaited<ReturnType<typeof listStudyTips>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStudyTips>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listStudyTips>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListStudyTipsQueryResult = NonNullable<Awaited<ReturnType<typeof listStudyTips>>>;
export type ListStudyTipsQueryError = ErrorType<unknown>;
/**
 * @summary Curated creative study tips
 */
export declare function useListStudyTips<TData = Awaited<ReturnType<typeof listStudyTips>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStudyTips>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List university programs with admission rates and careers
 */
export declare const getListUniversityProgramsUrl: () => string;
export declare const listUniversityPrograms: (options?: RequestInit) => Promise<UniversityProgram[]>;
export declare const getListUniversityProgramsQueryKey: () => readonly ["/api/masar/university-programs"];
export declare const getListUniversityProgramsQueryOptions: <TData = Awaited<ReturnType<typeof listUniversityPrograms>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listUniversityPrograms>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listUniversityPrograms>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListUniversityProgramsQueryResult = NonNullable<Awaited<ReturnType<typeof listUniversityPrograms>>>;
export type ListUniversityProgramsQueryError = ErrorType<unknown>;
/**
 * @summary List university programs with admission rates and careers
 */
export declare function useListUniversityPrograms<TData = Awaited<ReturnType<typeof listUniversityPrograms>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listUniversityPrograms>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Aggregate counts for the home dashboard
 */
export declare const getGetDashboardSummaryUrl: () => string;
export declare const getDashboardSummary: (options?: RequestInit) => Promise<DashboardSummary>;
export declare const getGetDashboardSummaryQueryKey: () => readonly ["/api/masar/dashboard-summary"];
export declare const getGetDashboardSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardSummary>>>;
export type GetDashboardSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Aggregate counts for the home dashboard
 */
export declare function useGetDashboardSummary<TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map