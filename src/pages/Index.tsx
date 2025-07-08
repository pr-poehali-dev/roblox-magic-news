import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image?: string;
  date: string;
  category: string;
}

const Index = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "Магическая энергия достигла нового пика",
      content:
        "Астрономы зафиксировали необычные колебания магической энергии в созвездии Дракона. Это может означать начало нового магического цикла.",
      image: "img/742cb2b4-93d7-40b7-b863-0a98a893499e.jpg",
      date: "2024-01-15",
      category: "Астрономия",
    },
    {
      id: 2,
      title: "Открыт новый портал в библиотеку знаний",
      content:
        "Магический совет объявил об открытии нового портала, ведущего к древним знаниям. Доступ будет ограничен.",
      image: "img/8bb48f07-d953-40d5-9ac2-7c0cc979e428.jpg",
      date: "2024-01-14",
      category: "Магия",
    },
    {
      id: 3,
      title: "Заклинание месяца: Защитный барьер",
      content:
        "Изучаем новое заклинание для создания защитного барьера. Эффективность увеличена на 300%.",
      date: "2024-01-13",
      category: "Обучение",
    },
  ]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const addNews = () => {
    if (newTitle && newContent) {
      const newNewsItem: NewsItem = {
        id: Date.now(),
        title: newTitle,
        content: newContent,
        category: newCategory || "Общее",
        date: new Date().toISOString().split("T")[0],
      };
      setNews([newNewsItem, ...news]);
      setNewTitle("");
      setNewContent("");
      setNewCategory("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="text-center mb-16 py-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Icon name="Sparkles" size={48} className="text-purple-300" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
              MAGIC NEWS
            </h1>
            <Icon name="Sparkles" size={48} className="text-pink-300" />
          </div>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
            Узнавайте о последних магических открытиях и событиях из мира
            волшебства
          </p>

          {/* Admin Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant={isAdmin ? "default" : "outline"}
              onClick={() => setIsAdmin(!isAdmin)}
              className={
                isAdmin
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-purple-300 text-purple-300 hover:bg-purple-900/50"
              }
            >
              <Icon name="Shield" size={16} className="mr-2" />
              {isAdmin ? "Админ режим" : "Войти как админ"}
            </Button>
          </div>
        </header>

        {/* Admin Panel */}
        {isAdmin && (
          <Card className="mb-12 bg-gradient-to-r from-purple-900/70 to-pink-900/70 border-purple-500/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-200">
                <Icon name="Edit3" size={20} />
                Добавить новость
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Заголовок новости"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-purple-950/50 border-purple-500/50 text-purple-100 placeholder-purple-300"
              />
              <Input
                placeholder="Категория"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="bg-purple-950/50 border-purple-500/50 text-purple-100 placeholder-purple-300"
              />
              <Textarea
                placeholder="Содержание новости"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="bg-purple-950/50 border-purple-500/50 text-purple-100 placeholder-purple-300 min-h-24"
              />
              <Button
                onClick={addNews}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Опубликовать
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <nav className="mb-12">
          <div className="flex justify-center gap-6">
            <Button
              variant="ghost"
              className="text-purple-200 hover:text-purple-100 hover:bg-purple-900/50"
            >
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </Button>
            <Button
              variant="ghost"
              className="text-purple-200 hover:text-purple-100 hover:bg-purple-900/50"
            >
              <Icon name="Newspaper" size={16} className="mr-2" />
              Свежие новости
            </Button>
            <Button
              variant="ghost"
              className="text-purple-200 hover:text-purple-100 hover:bg-purple-900/50"
            >
              <Icon name="Info" size={16} className="mr-2" />О проекте
            </Button>
          </div>
        </nav>

        {/* News Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-200 mb-8 text-center flex items-center justify-center gap-3">
            <Icon name="Zap" size={32} className="text-yellow-400" />
            Свежие новости
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card
                key={item.id}
                className="bg-gradient-to-br from-purple-950/70 to-pink-950/70 border-purple-500/50 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                {item.image && (
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent"></div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-purple-600/80 text-purple-100">
                      {item.category}
                    </Badge>
                    <span className="text-sm text-purple-300">{item.date}</span>
                  </div>
                  <CardTitle className="text-purple-100 text-lg leading-tight">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    {item.content}
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-4 text-purple-300 hover:text-purple-100 hover:bg-purple-900/50 p-0 h-auto"
                  >
                    Читать далее{" "}
                    <Icon name="ArrowRight" size={14} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-purple-950/70 to-pink-950/70 border-purple-500/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-purple-200 text-center flex items-center justify-center gap-3">
                <Icon name="BookOpen" size={32} className="text-orange-400" />О
                проекте
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-purple-200 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                Magic News — это магический портал, где собираются самые свежие
                новости из мира волшебства. Здесь вы найдете информацию о
                последних магических открытиях, заклинаниях и событиях.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Icon
                    name="Users"
                    size={48}
                    className="text-purple-300 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">
                    Сообщество
                  </h3>
                  <p className="text-purple-300 text-sm">
                    Присоединяйтесь к магическому сообществу
                  </p>
                </div>
                <div className="text-center">
                  <Icon
                    name="Scroll"
                    size={48}
                    className="text-pink-300 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">
                    Знания
                  </h3>
                  <p className="text-purple-300 text-sm">
                    Изучайте древние и современные заклинания
                  </p>
                </div>
                <div className="text-center">
                  <Icon
                    name="Star"
                    size={48}
                    className="text-orange-300 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">
                    Магия
                  </h3>
                  <p className="text-purple-300 text-sm">
                    Откройте для себя мир настоящей магии
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center text-purple-300 border-t border-purple-500/50 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Sparkles" size={20} />
            <span className="text-lg font-semibold">Magic News</span>
            <Icon name="Sparkles" size={20} />
          </div>
          <p className="text-sm">
            © 2024 Magic News. Все права защищены магическими заклинаниями.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
