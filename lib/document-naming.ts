/**
 * Document Naming Utility
 * Auto-generates document filenames according to specification:
 * [ClientCode]-[DriveCode]-[CabinetCode]-[SerialNo]-[Description]-V[Version]-[Date].[ext]
 */

export interface DocumentNamingConfig {
  clientCode: string // e.g., "ABC"
  driveCode: string // F for accounting, W for archive
  cabinetCode: string // A06, D20, E25, H39, W90
  description: string // Will be auto-sanitized to uppercase letters/numbers/underscore
  version: string // e.g., "1.0"
  date: string // ISO YYYY-MM-DD
  extension: string // e.g., "pdf", "xlsx"
  serialNo?: number // Will be auto-generated if not provided
}

export interface CabinetMapping {
  type: string
  code: string
  driveCode: string
  description: string
}

// Cabinet code mappings
export const CABINET_MAPPINGS: Record<string, CabinetMapping> = {
  "bank-statement": { type: "Bank Statement", code: "A06", driveCode: "F", description: "Bank statements" },
  "receipt-voucher": { type: "Receipt Voucher", code: "A06", driveCode: "F", description: "Receipt vouchers" },
  "payment-voucher": { type: "Payment Voucher", code: "A06", driveCode: "F", description: "Payment vouchers" },
  "sales-invoice": { type: "Sales Invoice", code: "E25", driveCode: "F", description: "Sales invoices" },
  "purchase-invoice": {
    type: "Purchase Invoice",
    code: "E25",
    driveCode: "F",
    description: "Purchase invoices",
  },
  "general-ledger": { type: "General Ledger", code: "D20", driveCode: "F", description: "General ledgers" },
  "trial-balance": { type: "Trial Balance", code: "D20", driveCode: "F", description: "Trial balances" },
  "archive-package": { type: "Archive Package", code: "W90", driveCode: "W", description: "Archive packages" },
}

/**
 * Sanitize description: allow only uppercase letters, numbers, and underscores
 */
export function sanitizeDescription(description: string): string {
  return description
    .toUpperCase()
    .replace(/[^A-Z0-9_]/g, "_")
    .replace(/_+/g, "_") // Remove consecutive underscores
    .replace(/^_+|_+$/g, "") // Remove leading/trailing underscores
}

/**
 * Generate document filename based on config
 */
export function generateFilename(config: DocumentNamingConfig): string {
  const sanitized = sanitizeDescription(config.description)
  const serialNo = String(config.serialNo || 1).padStart(3, "0")
  const version = `V${config.version}`
  const date = config.date

  return `${config.clientCode}-${config.driveCode}-${config.cabinetCode}-${serialNo}-${sanitized}-${version}-${date}.${config.extension}`
}

/**
 * Parse a filename to extract components
 */
export function parseFilename(filename: string): Partial<DocumentNamingConfig> | null {
  // Pattern: [ClientCode]-[DriveCode]-[CabinetCode]-[SerialNo]-[Description]-V[Version]-[Date].[ext]
  const pattern = /^([A-Z]{2,3})-([FW])-([A-Z]\d{2})-(\d{3})-([A-Z0-9_]+)-V([\d.]+)-(\d{4}-\d{2}-\d{2})\.(.+)$/
  const match = filename.match(pattern)

  if (!match) return null

  return {
    clientCode: match[1],
    driveCode: match[2],
    cabinetCode: match[3],
    serialNo: parseInt(match[4]),
    description: match[5],
    version: match[6],
    date: match[7],
    extension: match[8],
  }
}

/**
 * Get next serial number for a cabinet within a client
 * In a real app, this would query the database
 */
export function getNextSerialNumber(
  clientCode: string,
  cabinetCode: string,
  existingDocs: { serialNo: number }[],
): number {
  const maxSerial = existingDocs.reduce((max, doc) => Math.max(max, doc.serialNo || 0), 0)
  return maxSerial + 1
}

export const DOCUMENT_TYPES = Object.keys(CABINET_MAPPINGS)
