interface ResponseFormatterHideId<DataType, ResponseFormat> {
  format(data: DataType, hideId: boolean): ResponseFormat | Promise<ResponseFormat>;
}

export default ResponseFormatterHideId;

