import {
  ActionContext,
  ActionRequest,
  After,
  BulkActionResponse,
} from 'adminjs/types/src'
import { BaseProvider } from '../providers'
import { UploadOptionsWithDefault } from '../types/upload-options.type'
import { deleteFile } from '../utils/delete-file'

export const deleteFilesFactory = (
  uploadOptionsWithDefault: UploadOptionsWithDefault,
  provider: BaseProvider,
): After<BulkActionResponse> => async function deleteFilesHook(
  response: BulkActionResponse,
  request: ActionRequest,
  context: ActionContext,
): Promise<BulkActionResponse> {
  const { records = [] } = context
  if (request.method === 'post') {
    await Promise.all(
      records.map(async (record) => {
        await deleteFile(uploadOptionsWithDefault, provider, context, record)
      }),
    )
  }

  return response
}
