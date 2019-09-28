interface ResponseFormatter<DataType, ResponseFormat> {
  format(data: DataType): ResponseFormat | Promise<ResponseFormat>;
}

export default ResponseFormatter;
