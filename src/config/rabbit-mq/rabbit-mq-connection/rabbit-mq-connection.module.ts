import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
            exchanges: [
              {
                name: '', // name of the name of the topic 
                type: 'topic',
              },
            ],
            uri: '', // name of the AMQP url
            connectionInitOptions: { wait: false },
          }),
    ],
    exports:[RabbitMqConnectionModule]
})
export class RabbitMqConnectionModule {}
