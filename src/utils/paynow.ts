// Paynow Integration Configuration
export const PAYNOW_CONFIG = {
  type: '3rd Party Integration',
  paymentLink: 'erpnext-usd',
  integrationId: 21044,
  integrationKey: 'b1f1b8fb-0ae5-47f4-aa6e-0f250c38fa64',
  baseUrl: 'https://www.paynow.co.zw/interface/initiatetransaction'
};

export interface PaynowPaymentData {
  reference: string;
  amount: number;
  additionalInfo: string;
  returnUrl: string;
  resultUrl: string;
  email: string;
  phone?: string;
}

export class PaynowService {
  private static generateHash(data: string): string {
    // Simple hash generation for demo - in production use proper crypto
    return btoa(data).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
  }

  static async initiatePayment(paymentData: PaynowPaymentData): Promise<string> {
    const {
      reference,
      amount,
      additionalInfo,
      returnUrl,
      resultUrl,
      email,
      phone
    } = paymentData;

    // Prepare payment parameters
    const params = new URLSearchParams({
      'id': PAYNOW_CONFIG.integrationId.toString(),
      'reference': reference,
      'amount': amount.toString(),
      'additionalinfo': additionalInfo,
      'returnurl': returnUrl,
      'resulturl': resultUrl,
      'email': email,
      ...(phone && { 'phone': phone })
    });

    // Generate hash for security
    const hashString = `${PAYNOW_CONFIG.integrationKey}${reference}${amount}${additionalInfo}${returnUrl}${resultUrl}${email}`;
    const hash = this.generateHash(hashString);
    params.append('hash', hash);

    // Create payment URL
    const paymentUrl = `${PAYNOW_CONFIG.baseUrl}?${params.toString()}`;
    
    return paymentUrl;
  }

  static generateReference(memberName: string, membershipType: string): string {
    const timestamp = Date.now();
    const cleanName = memberName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
    return `MEM-${cleanName}-${membershipType.toUpperCase()}-${timestamp}`;
  }

  static formatAmount(amount: number): number {
    // Paynow expects amount in cents for USD
    return Math.round(amount * 100);
  }
}