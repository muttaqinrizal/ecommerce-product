import { GetServerSidePropsContext, PreviewData } from "next"

type ParsedUrlQuery = {
  [key: string]: string | string[] | undefined
}

type Context = GetServerSidePropsContext<ParsedUrlQuery, PreviewData>

export function getQueryUrl(query: string, context: Context) {
  return context.query[query] ? context.query[query] as string : undefined
}

export function getParamUrl(param: string, context: Context) {
  return context.params ? context.params[param] as string : undefined
}
