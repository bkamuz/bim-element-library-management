import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Server, Building, Users, Shield, Zap, Wrench } from "lucide-react";

export function CommercialSection() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2>Возможности коммерческого использования</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Гибкие модели размещения и поддержки для различных типов пользователей
        </p>
      </div>

      <Tabs defaultValue="ziккурат-servers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ziккурат-servers">На серверах Зиккурат</TabsTrigger>
          <TabsTrigger value="company-servers">На серверах компании</TabsTrigger>
        </TabsList>

        <TabsContent value="ziккурат-servers" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Производители */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Производители оборудования
                </CardTitle>
                <CardDescription>
                  Размещение каталогов оборудования в библиотеке
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-chart-4 text-white">Уровень 1</Badge>
                    <div>
                      <p className="font-medium">Общедоступное хранилище</p>
                      <p className="text-muted-foreground">Доступ к загрузке в общедоступное хранилище, объекты доступны всем пользователям плагина</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-chart-1 text-white">Уровень 2</Badge>
                    <div>
                      <p className="font-medium">Ограниченный доступ</p>
                      <p className="text-muted-foreground">Доступ ограничен определенным компаниям, которые хотят получить доступ к этому оборудованию</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Проектировщики */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Проектировщики и девелоперы
                </CardTitle>
                <CardDescription>
                  Управление проектными библиотеками
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-chart-4 text-white">Уровень 1</Badge>
                    <div>
                      <p className="font-medium">Открытое хранилище</p>
                      <p className="text-muted-foreground">Доступ к загрузке в открытое общее хранилище</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-chart-1 text-white">Уровень 2</Badge>
                    <div>
                      <p className="font-medium">Закрытое хранилище</p>
                      <p className="text-muted-foreground">Доступ к закрытому хранилищу компании для загрузки собственных объектов</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="company-servers" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Единоразовый запуск */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Единоразовый запуск
                </CardTitle>
                <CardDescription>
                  Полная настройка с поддержкой
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-chart-4" />
                    <span>Единоразовый запуск и настройка</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-chart-4" />
                    <span>Поддержка в первые 3 месяца</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-chart-4" />
                    <span>Быстрый старт</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Подписка */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Модель подписки
                </CardTitle>
                <CardDescription>
                  Постоянная поддержка и обновления
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">Обычная подписка</p>
                    <p className="text-muted-foreground">Добавление новых функций, настройки и помощь</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Расширенная подписка</p>
                    <p className="text-muted-foreground">Обсуждение необходимых инструментов, приоритетная разработка функций</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}