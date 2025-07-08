import React, { useState, useEffect } from "react";
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

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: "release" | "update" | "event";
  description?: string;
}

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "Релиз нового заклинания",
      date: "2024-01-20",
      type: "release",
      description: "Выход заклинания защитного барьера 3.0",
    },
    {
      id: 2,
      title: "Обновление портала",
      date: "2024-01-25",
      type: "update",
      description: "Улучшение скорости загрузки на 50%",
    },
    {
      id: 3,
      title: "Магическая конференция",
      date: "2024-02-01",
      type: "event",
      description: "Встреча всех волшебников мира",
    },
  ]);

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
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventType, setNewEventType] = useState<
    "release" | "update" | "event"
  >("release");
  const [newEventDescription, setNewEventDescription] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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

  const addEvent = () => {
    if (newEventTitle && newEventDate) {
      const newEvent: CalendarEvent = {
        id: Date.now(),
        title: newEventTitle,
        date: newEventDate,
        type: newEventType,
        description: newEventDescription,
      };
      setCalendarEvents([...calendarEvents, newEvent]);
      setNewEventTitle("");
      setNewEventDate("");
      setNewEventDescription("");
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "release":
        return "bg-green-600";
      case "update":
        return "bg-blue-600";
      case "event":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "release":
        return "Rocket";
      case "update":
        return "RefreshCw";
      case "event":
        return "Calendar";
      default:
        return "Circle";
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900"
          : "bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse floating-element"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-300 floating-element"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-700 floating-element"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-500/20 rounded-full blur-lg animate-pulse delay-1000 floating-element"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="text-center mb-16 py-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Icon
              name="Sparkles"
              size={48}
              className={`${isDarkMode ? "text-purple-300" : "text-purple-700"} floating-element`}
            />
            <h1
              className={`text-6xl font-bold bg-gradient-to-r ${
                isDarkMode
                  ? "from-purple-300 via-pink-300 to-orange-300"
                  : "from-purple-700 via-pink-700 to-orange-700"
              } bg-clip-text text-transparent drop-shadow-lg magic-sparkle`}
            >
              MAGIC NEWS
            </h1>
            <Icon
              name="Sparkles"
              size={48}
              className={`${isDarkMode ? "text-pink-300" : "text-pink-700"} floating-element`}
            />
          </div>
          <p
            className={`text-xl ${isDarkMode ? "text-purple-200" : "text-purple-800"} max-w-2xl mx-auto leading-relaxed`}
          >
            Узнавайте о последних магических открытиях и событиях из мира
            волшебства
          </p>

          {/* Theme Toggle and Admin Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={toggleTheme}
              className={`${isDarkMode ? "border-purple-300 text-purple-300 hover:bg-purple-900/50" : "border-purple-700 text-purple-700 hover:bg-purple-100"} pulse-glow`}
            >
              <Icon
                name={isDarkMode ? "Sun" : "Moon"}
                size={16}
                className="mr-2"
              />
              {isDarkMode ? "Светлая тема" : "Тёмная тема"}
            </Button>
            <Button
              variant={isAdmin ? "default" : "outline"}
              onClick={() => setIsAdmin(!isAdmin)}
              className={
                isAdmin
                  ? "bg-purple-600 hover:bg-purple-700"
                  : `${isDarkMode ? "border-purple-300 text-purple-300 hover:bg-purple-900/50" : "border-purple-700 text-purple-700 hover:bg-purple-100"}`
              }
            >
              <Icon name="Shield" size={16} className="mr-2" />
              {isAdmin ? "Админ режим" : "Войти как админ"}
            </Button>
          </div>
        </header>

        {/* Admin Panel */}
        {isAdmin && (
          <div className="mb-12 space-y-6">
            <Card
              className={`${isDarkMode ? "bg-gradient-to-r from-purple-900/70 to-pink-900/70 border-purple-500/50" : "bg-gradient-to-r from-purple-100/70 to-pink-100/70 border-purple-300/50"} backdrop-blur-sm pulse-glow`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-2 ${isDarkMode ? "text-purple-200" : "text-purple-800"}`}
                >
                  <Icon name="Edit3" size={20} />
                  Добавить новость
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Заголовок новости"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`${isDarkMode ? "bg-purple-950/50 border-purple-500/50 text-purple-100 placeholder-purple-300" : "bg-purple-50/50 border-purple-300/50 text-purple-900 placeholder-purple-600"}`}
                />
                <Input
                  placeholder="Категория"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className={`${isDarkMode ? "bg-purple-950/50 border-purple-500/50 text-purple-100 placeholder-purple-300" : "bg-purple-50/50 border-purple-300/50 text-purple-900 placeholder-purple-600"}`}
                />
                <Textarea
                  placeholder="Содержание новости"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className={`${isDarkMode ? "bg-purple-950/50 border-purple-500/50 text-purple-100 placeholder-purple-300" : "bg-purple-50/50 border-purple-300/50 text-purple-900 placeholder-purple-600"} min-h-24`}
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

            <Card
              className={`${isDarkMode ? "bg-gradient-to-r from-purple-900/70 to-pink-900/70 border-purple-500/50" : "bg-gradient-to-r from-purple-100/70 to-pink-100/70 border-purple-300/50"} backdrop-blur-sm pulse-glow`}
            >
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-2 ${isDarkMode ? "text-purple-200" : "text-purple-800"}`}
                >
                  <Icon name="CalendarPlus" size={20} />
                  Добавить событие в календарь
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Название события"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className={`${isDarkMode ? "bg-purple-950/50 border-purple-500/50 text-purple-100 placeholder-purple-300" : "bg-purple-50/50 border-purple-300/50 text-purple-900 placeholder-purple-600"}`}
                />
                <Input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className={`${isDarkMode ? "bg-purple-950/50 border-purple-500/50 text-purple-100" : "bg-purple-50/50 border-purple-300/50 text-purple-900"}`}
                />
                <select
                  value={newEventType}
                  onChange={(e) =>
                    setNewEventType(
                      e.target.value as "release" | "update" | "event",
                    )
                  }
                  className={`w-full p-2 rounded-md ${isDarkMode ? "bg-purple-950/50 border-purple-500/50 text-purple-100" : "bg-purple-50/50 border-purple-300/50 text-purple-900"} border`}
                >
                  <option value="release">Релиз</option>
                  <option value="update">Обновление</option>
                  <option value="event">Событие</option>
                </select>
                <Textarea
                  placeholder="Описание события"
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  className={`${isDarkMode ? "bg-purple-950/50 border-purple-500/50 text-purple-100 placeholder-purple-300" : "bg-purple-50/50 border-purple-300/50 text-purple-900 placeholder-purple-600"} min-h-20`}
                />
                <Button
                  onClick={addEvent}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить событие
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <nav className="mb-12">
          <div className="flex justify-center gap-6 flex-wrap">
            <Button
              variant="ghost"
              className={`${isDarkMode ? "text-purple-200 hover:text-purple-100 hover:bg-purple-900/50" : "text-purple-800 hover:text-purple-900 hover:bg-purple-100/50"} floating-element`}
            >
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </Button>
            <Button
              variant="ghost"
              className={`${isDarkMode ? "text-purple-200 hover:text-purple-100 hover:bg-purple-900/50" : "text-purple-800 hover:text-purple-900 hover:bg-purple-100/50"} floating-element`}
            >
              <Icon name="Newspaper" size={16} className="mr-2" />
              Свежие новости
            </Button>
            <Button
              variant="ghost"
              className={`${isDarkMode ? "text-purple-200 hover:text-purple-100 hover:bg-purple-900/50" : "text-purple-800 hover:text-purple-900 hover:bg-purple-100/50"} floating-element`}
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Календарь событий
            </Button>
            <Button
              variant="ghost"
              className={`${isDarkMode ? "text-purple-200 hover:text-purple-100 hover:bg-purple-900/50" : "text-purple-800 hover:text-purple-900 hover:bg-purple-100/50"} floating-element`}
            >
              <Icon name="Info" size={16} className="mr-2" />О проекте
            </Button>
          </div>
        </nav>

        {/* Calendar Section */}
        <section className="mb-16">
          <h2
            className={`text-3xl font-bold ${isDarkMode ? "text-purple-200" : "text-purple-800"} mb-8 text-center flex items-center justify-center gap-3`}
          >
            <Icon
              name="Calendar"
              size={32}
              className="text-yellow-400 floating-element"
            />
            Календарь событий
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card
              className={`${isDarkMode ? "bg-gradient-to-br from-purple-950/70 to-pink-950/70 border-purple-500/50" : "bg-gradient-to-br from-purple-50/70 to-pink-50/70 border-purple-300/50"} backdrop-blur-sm pulse-glow`}
            >
              <CardHeader>
                <CardTitle
                  className={`${isDarkMode ? "text-purple-200" : "text-purple-800"} flex items-center gap-2`}
                >
                  <Icon name="Calendar" size={20} />
                  Календарь
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg"></div>
                <img
                  src="img/3c979bb0-fc9d-4ee7-a10c-5ba6ff827294.jpg"
                  alt="Магический календарь"
                  className="w-full h-64 object-cover rounded-lg mb-4 magic-sparkle"
                />
                <p
                  className={`${isDarkMode ? "text-purple-200" : "text-purple-800"} text-sm text-center`}
                >
                  Магический календарь с важными датами
                </p>
              </CardContent>
            </Card>

            <Card
              className={`${isDarkMode ? "bg-gradient-to-br from-purple-950/70 to-pink-950/70 border-purple-500/50" : "bg-gradient-to-br from-purple-50/70 to-pink-50/70 border-purple-300/50"} backdrop-blur-sm pulse-glow`}
            >
              <CardHeader>
                <CardTitle
                  className={`${isDarkMode ? "text-purple-200" : "text-purple-800"} flex items-center gap-2`}
                >
                  <Icon name="Clock" size={20} />
                  Предстоящие события
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                {calendarEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg ${isDarkMode ? "bg-purple-900/30" : "bg-purple-100/30"} border ${isDarkMode ? "border-purple-500/30" : "border-purple-300/30"} hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        className={`${getEventTypeColor(event.type)} text-white`}
                      >
                        <Icon
                          name={getEventTypeIcon(event.type)}
                          size={12}
                          className="mr-1"
                        />
                        {event.type === "release"
                          ? "Релиз"
                          : event.type === "update"
                            ? "Обновление"
                            : "Событие"}
                      </Badge>
                      <span
                        className={`text-sm ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        {event.date}
                      </span>
                    </div>
                    <h3
                      className={`font-semibold ${isDarkMode ? "text-purple-100" : "text-purple-900"} mb-1`}
                    >
                      {event.title}
                    </h3>
                    {event.description && (
                      <p
                        className={`text-sm ${isDarkMode ? "text-purple-200" : "text-purple-700"}`}
                      >
                        {event.description}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* News Section */}
        <section className="mb-16">
          <h2
            className={`text-3xl font-bold ${isDarkMode ? "text-purple-200" : "text-purple-800"} mb-8 text-center flex items-center justify-center gap-3`}
          >
            <Icon
              name="Zap"
              size={32}
              className="text-yellow-400 floating-element"
            />
            Свежие новости
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Card
                key={item.id}
                className={`${isDarkMode ? "bg-gradient-to-br from-purple-950/70 to-pink-950/70 border-purple-500/50" : "bg-gradient-to-br from-purple-50/70 to-pink-50/70 border-purple-300/50"} backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-2xl ${isDarkMode ? "hover:shadow-purple-500/25" : "hover:shadow-purple-300/25"} magic-sparkle`}
              >
                {item.image && (
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-purple-900/70" : "from-purple-100/70"} to-transparent`}
                    ></div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-purple-600/80 text-purple-100">
                      {item.category}
                    </Badge>
                    <span
                      className={`text-sm ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                    >
                      {item.date}
                    </span>
                  </div>
                  <CardTitle
                    className={`${isDarkMode ? "text-purple-100" : "text-purple-900"} text-lg leading-tight`}
                  >
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`${isDarkMode ? "text-purple-200" : "text-purple-800"} text-sm leading-relaxed`}
                  >
                    {item.content}
                  </p>
                  <Button
                    variant="ghost"
                    className={`mt-4 ${isDarkMode ? "text-purple-300 hover:text-purple-100 hover:bg-purple-900/50" : "text-purple-600 hover:text-purple-900 hover:bg-purple-100/50"} p-0 h-auto`}
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
          <Card
            className={`${isDarkMode ? "bg-gradient-to-r from-purple-950/70 to-pink-950/70 border-purple-500/50" : "bg-gradient-to-r from-purple-50/70 to-pink-50/70 border-purple-300/50"} backdrop-blur-sm pulse-glow`}
          >
            <CardHeader>
              <CardTitle
                className={`text-3xl font-bold ${isDarkMode ? "text-purple-200" : "text-purple-800"} text-center flex items-center justify-center gap-3`}
              >
                <Icon
                  name="BookOpen"
                  size={32}
                  className="text-orange-400 floating-element"
                />
                О проекте
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p
                className={`${isDarkMode ? "text-purple-200" : "text-purple-800"} text-lg leading-relaxed max-w-3xl mx-auto mb-8`}
              >
                Magic News — это магический портал, где собираются самые свежие
                новости из мира волшебства. Здесь вы найдете информацию о
                последних магических открытиях, заклинаниях и событиях.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center floating-element">
                  <Icon
                    name="Users"
                    size={48}
                    className={`${isDarkMode ? "text-purple-300" : "text-purple-600"} mx-auto mb-4`}
                  />
                  <h3
                    className={`text-lg font-semibold ${isDarkMode ? "text-purple-200" : "text-purple-800"} mb-2`}
                  >
                    Сообщество
                  </h3>
                  <p
                    className={`${isDarkMode ? "text-purple-300" : "text-purple-600"} text-sm`}
                  >
                    Присоединяйтесь к магическому сообществу
                  </p>
                </div>
                <div className="text-center floating-element">
                  <Icon
                    name="Scroll"
                    size={48}
                    className={`${isDarkMode ? "text-pink-300" : "text-pink-600"} mx-auto mb-4`}
                  />
                  <h3
                    className={`text-lg font-semibold ${isDarkMode ? "text-purple-200" : "text-purple-800"} mb-2`}
                  >
                    Знания
                  </h3>
                  <p
                    className={`${isDarkMode ? "text-purple-300" : "text-purple-600"} text-sm`}
                  >
                    Изучайте древние и современные заклинания
                  </p>
                </div>
                <div className="text-center floating-element">
                  <Icon
                    name="Star"
                    size={48}
                    className={`${isDarkMode ? "text-orange-300" : "text-orange-600"} mx-auto mb-4`}
                  />
                  <h3
                    className={`text-lg font-semibold ${isDarkMode ? "text-purple-200" : "text-purple-800"} mb-2`}
                  >
                    Магия
                  </h3>
                  <p
                    className={`${isDarkMode ? "text-purple-300" : "text-purple-600"} text-sm`}
                  >
                    Откройте для себя мир настоящей магии
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer
          className={`text-center ${isDarkMode ? "text-purple-300 border-purple-500/50" : "text-purple-600 border-purple-300/50"} border-t pt-8`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Sparkles" size={20} className="floating-element" />
            <span className="text-lg font-semibold">Magic News</span>
            <Icon name="Sparkles" size={20} className="floating-element" />
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
