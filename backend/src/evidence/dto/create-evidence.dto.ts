export class CreateEvidenceDto {
  caseId!: string;

  type!: 'VIDEO' | 'AUDIO' | 'IMAGE' | 'DOCUMENT';

  fileUrl!: string;
}