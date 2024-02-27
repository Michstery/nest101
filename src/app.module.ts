import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
///////////////------ Modules Used In Project -----////////////
import { productModule } from "./products/products.module";

@Module({
  imports: [productModule, MongooseModule.forRoot(process.env.MONGODB_URL)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
